import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPRYvI1i4mXeoJcBo4nRzzJ1c-PEYLPjc",
  authDomain: "streamly-d777d.firebaseapp.com",
  projectId: "streamly-d777d",
  storageBucket: "streamly-d777d.firebasestorage.app",
  messagingSenderId: "777182092653",
  appId: "1:777182092653:web:34b30a8cc5b8252ee50e64",
  measurementId: "G-J84DEXCH47"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email , password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try{
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth);

}

export {auth, db, login, signup, logout};