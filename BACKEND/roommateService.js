import { app } from "./firebase.js";
import { collection, addDoc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export function createRoommate(roommateId) {
    try{
        const usersRef = collection(db, "roommates");
        const dates = roommateId.Available_Dates;
        const bills = roommateId.Bills;
        const chores = roommateId.chores;
        const name = roommateId.name;
        addDoc(usersRef, {dates, bills, chores, name});
    } catch (error){
        console.error("failed to add user:", error);
    }
}

export function updateRoommate(roommateId, updates) {
    try{
        const roommateDoc = doc(db, "roommates", roommateId);
        updateDoc(roommateDoc, updates);
    } catch (error){
        console.error("failed to add user:", error);
    }
}

export function destroyRoommate(roommateId) {
    try{
        const roommateDoc = doc(db, "roommates", roommateId);
        deleteDoc(roommateDoc);
    } catch (error){
        console.error("failed to add user:", error);
    }
}


