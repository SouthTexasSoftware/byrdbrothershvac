let process: NodeJS.ProcessEnv | undefined;

const p = process?.env ? process.env : import.meta.env;

export const firebaseClientConfig = {
  //@ts-ignore
  apiKey: p.FIREBASE_APIKEY,
  //@ts-ignore
  authDomain: p.FIREBASE_AUTHDOMAIN,
  //@ts-ignore
  projectId: p.FIREBASE_PROJECTID,
  //@ts-ignore
  storageBucket: p.FIREBASE_STORAGEBUCKET,
  //@ts-ignore
  messagingSenderId: p.FIREBASE_MESSAGINGSENDERID,
  //@ts-ignore
  appId: p.FIREBASE_APPID,
  //@ts-ignore
  measurementId: p.FIREBASE_MEASUREMENTID,
};

export const sendgridConfig = {
  //@ts-ignore
  apiKey: p.SENDGRID_API_KEY,
};
