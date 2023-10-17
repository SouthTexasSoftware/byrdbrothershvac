import { firebaseClientConfig } from "../config";
import {
  persistentLocalCache,
  persistentMultipleTabManager,
} from "@firebase/firestore";
import { firebaseStore } from "./stores";
import { get } from "svelte/store";
import { getAnalytics } from "firebase/analytics";

/**
 * Asynchronous call to establish connection with Firebase
 * @returns boolean
 */
export async function connectToFirebase() {
  if (typeof window != undefined) {
    try {
      const appModule = await import("firebase/app");
      const firestoreModule = await import("firebase/firestore");

      // ** PUBLIC VARIABLES **

      // Initialize Firebase
      const app = appModule.initializeApp(
        firebaseClientConfig,
        "byrd-brothers-hvac"
      );

      const db = firestoreModule.initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });

      firebaseStore.set({
        app: app,
        db: db,
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

/**
 *  For now, this will be called in an onMount function only. And check for deployed url vs dev server
 */
export function connectAnalytics() {
  if (get(firebaseStore)) {
    let fb = get(firebaseStore);
    const analytics = getAnalytics(fb.app);

    return analytics;
  }
}
