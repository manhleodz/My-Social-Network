// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCZe4EhbO6yCXlLoHMGwA8YA6u80hcHQgE",
    authDomain: "my-social-network-1fc04.firebaseapp.com",
    projectId: "my-social-network-1fc04",
    storageBucket: "my-social-network-1fc04.appspot.com",
    messagingSenderId: "309907946552",
    appId: "1:309907946552:web:bc5dcc8bd61349c3877acd",
    measurementId: "G-1X9WBZNKDC"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);