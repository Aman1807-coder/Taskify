import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    doc,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        })
    }, []);

    const isLoggedIn = user ? true : false;

    const signupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);

    const signinUserWithEmailAndPassword = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password);

    const signoutUser = () =>
        signOut(firebaseAuth);

    const handleTaskAdd = async (title, description, priority) => {
        try {
            const res = await addDoc(collection(firestore, 'tasks'), {
                title,
                description,
                priority,
                createdAt: serverTimestamp(),
                userId: user.uid,
                userEmail: user.email,
                displayName: user.displayName
            });

            return res;
        } catch (error) {
            alert(error.messgae);
        }
    }

    const handleTaskUpdate = async (id, title, description, priority) => {
        try {
            const taskRef = doc(firestore, 'tasks', id);
            const res = await updateDoc(taskRef, {
                title: title,
                description: description,
                priority: priority
            });

            return res;
        } catch (error) {
            alert(error.messgae)
        }
    }

    const handleTaskDelete = async (id) => {
        try {
            const taskRef = doc(firestore, 'tasks', id);
            const res = await deleteDoc(taskRef);
            return res;
        } catch (error) {
            alert(error.messgae)
        }
    }

    const listAllTasks = async() => {
        const q = query(collection(firestore, "tasks"), orderBy("createdAt", "asc"));
        return await getDocs(q);
    }

    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            signinWithGoogle,
            signoutUser,
            handleTaskAdd,
            listAllTasks,
            handleTaskUpdate,
            handleTaskDelete,
            isLoggedIn,
            user
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}