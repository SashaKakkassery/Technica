import { app } from "./firebase.js";
import { collection, addDoc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export function createUser(userId) {
    try{
        const usersRef = collection(db, "users");
        const name = userId.name;
        const password = userId.password;
        addDoc(usersRef, {name, password});
    } catch (error){
        console.error("failed to add user:", error);
    }
}

export function updateUser(userId, updates) {
    try{
        const userDoc = doc(db, "users", userId);
        updateDoc(userDoc, updates);
    } catch (error){
        console.error("failed to add user:", error);
    }
}

export function destroyUser(userId) {
    try{
        const userDoc = doc(db, "users", userId);
        deleteDoc(userDoc);
    } catch (error){
        console.error("failed to add user:", error);
    }
}


