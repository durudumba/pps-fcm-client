import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDERID,
    REACT_APP_APP_ID
 } = process.env;

const firebaseConfig = {
    apiKey: `${REACT_APP_API_KEY}`,
    authDomain: `${REACT_APP_AUTH_DOMAIN}`,
    projectId: `${REACT_APP_PROJECT_ID}`,
    storageBucket:  `${REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${REACT_APP_MESSAGING_SENDERID}`,
    appId: `${REACT_APP_APP_ID}`
};

export const firebase = initializeApp(firebaseConfig);
export const Messaging = getMessaging(firebase);
