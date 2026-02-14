// src/lib/markdown/parser.ts
import * as marked from 'marked';

export type BlogBlock =
  | {
      type: 'section';
      title: string;
      position: 'left' | 'right' | 'none' | 'full';
      content: string;
    }
  | {
      type: 'image';
      src: string;
      caption: string;
      position: 'left' | 'right' | 'none' | 'full';
      link?: string; // NEW
      isSecondConsecutive?: boolean;
    }
  | {
      type: 'sectionBreak';
    };

type Position = 'left' | 'right' | 'none' | 'full';

function extractPosition(text: string): { text: string; position: Position } {
  const positionMatch = text.match(/\s*\\?\[(left|right|none|full)\]\s*$/i);
  if (positionMatch) {
    return {
      text: text.replace(/\s*\\?\[(left|right|none|full)\]\s*$/i, '').trim(),
      position: positionMatch[1].toLowerCase() as Position,
    };
  }
  return { text, position: 'none' };
}

function extractTrailingLink(text: string): { text: string; link?: string } {
  const linkMatch = text.match(/\s*\((https?:\/\/[^\s]+)\)\s*$/i);
  
  if (linkMatch) {
    return {
      text: text.replace(/\s*\((https?:\/\/[^\s]+)\)\s*$/i, '').trim(),
      link: linkMatch[1],
    };
  }

  return { text };
}

export function parseMarkdown(markdown?: string): BlogBlock[] {
  if (!markdown || typeof markdown !== 'string') {
    return [];
  }
  
  const tokens = marked.lexer(markdown);
  const blocks: BlogBlock[] = [];
  let currentSection: BlogBlock & { type: 'section' } | null = null;

  function flushSection() {
    if (currentSection) {
      blocks.push(currentSection);
      currentSection = null;
    }
  }

  for (const token of tokens) {
    // Handle headings (section titles)
    if (token.type === 'heading' && token.depth === 2) {
      flushSection();
      
      const { text: title, position } = extractPosition(token.text);
      
      currentSection = {
        type: 'section',
        title,
        position,
        content: '',
      };
      continue;
    }

    // Handle horizontal rules (section breaks)
    if (token.type === 'hr') {
      flushSection();
      blocks.push({ type: 'sectionBreak' });
      continue;
    }

    // Handle paragraphs (which may contain images)
    if (token.type === 'paragraph' && 'tokens' in token && token.tokens) {
      // Check if paragraph contains only an image
      const imageToken = token.tokens.find(t => t.type === 'image') as marked.Tokens.Image | undefined;
      
      if (imageToken && token.tokens.length === 1) {
        flushSection();
        
        const rawCaption = imageToken.title ?? imageToken.text ?? '';

        // 1️⃣ Extract trailing link first
        const { text: withoutLink, link } = extractTrailingLink(rawCaption);

        // 2️⃣ Then extract position
        const { text: cleanCaption, position } = extractPosition(withoutLink);

        blocks.push({
          type: 'image',
          src: imageToken.href,
          caption: cleanCaption,
          position,
          link,
        });
        continue;
      }
      
      if (currentSection) {

          let html = marked.parser([token]);

          html = html.replace(/<code>([\s\S]*?)<\/code>/g, (_, content) => {
          const decoded = content
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');

          return decoded;
        });

          currentSection.content += html;
        } else {
          // Paragraph without a section - create an untitled section
          let html = marked.parser([token]);

          html = html.replace(/<code>([\s\S]*?)<\/code>/g, (_, content) => {
            return content;
          });

          currentSection = {
            type: 'section',
            title: '',
            position: 'none',
            content: html,
          };
        }
        continue;
    }

    // Handle lists
    if (token.type === 'list') {
      if (currentSection) {
        currentSection.content += marked.parser([token]);
      } else {
        currentSection = {
          type: 'section',
          title: '',
          position: 'none',
          content: marked.parser([token]),
        };
      }
      continue;
    }

    // Handle HTML (line breaks)
    if (token.type === 'html') {
      const trimmedText = token.text.trim().toLowerCase();
      if (trimmedText.startsWith('<br') && currentSection) {
        currentSection.content += '<br />';
      }
      continue;
    }

    // Skip spaces
    if (token.type === 'space') {
      continue;
    }
  }

  flushSection();
  
  // POST-PROCESS: Mark consecutive images
  for (let i = 1; i < blocks.length; i++) {
    const current = blocks[i];
    const previous = blocks[i - 1];
    
    if (current.type === 'image' && previous.type === 'image') {
      current.isSecondConsecutive = true;
    }
  }
  
  return blocks;
}