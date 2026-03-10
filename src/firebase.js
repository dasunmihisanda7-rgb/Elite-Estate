// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWdTlaEd0HmTRuW613QdWJRgO2IIm1N8U",
    authDomain: "elite-estate-98862.firebaseapp.com",
    projectId: "elite-estate-98862",
    storageBucket: "elite-estate-98862.firebasestorage.app",
    messagingSenderId: "1048790756262",
    appId: "1:1048790756262:web:af39d7925a54cdf8217d67",
    measurementId: "G-HM8WZZL6KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
