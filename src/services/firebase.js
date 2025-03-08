import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, getIdToken } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCowlfweEvsBYBJaFVwuj2qtB0hiAMBfpk",
    authDomain: "spirit11-c85eb.firebaseapp.com",
    projectId: "spirit11-c85eb",
    storageBucket: "spirit11-c85eb.firebasestorage.app",
    messagingSenderId: "166640672022",
    appId: "1:166640672022:web:cadb6a984e939f2c560437"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, getIdToken };