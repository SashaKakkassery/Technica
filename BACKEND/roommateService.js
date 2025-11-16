import { app } from "./firebase.js";
import { doc, collection, addDoc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";

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

export function updateRoommate(roommateName, updates) {
    try{
        const roommateId =  getUserIdByName(roommateName);
        if (!roommateId || typeof roommateId !== "string") {
          console.log("Invalid or missing user ID:", roommateId);
          return;
        }

        const roommateDoc = doc(db, "roommates", roommateId);
        updateDoc(roommateDoc, updates);
    } catch (error){
        console.error("failed to add user:", error);
    }
}

export function destroyRoommate(roommateName) {
    try{
        const roommateId =  getUserIdByName(roommateName);
        if (!roommateId || typeof roommateId !== "string") {
          console.log("Invalid or missing user ID:", roommateId);
          return;
        }

        const roommateDoc = doc(db, "roommates", roommateId);
        deleteDoc(roommateDoc);
    } catch (error){
        console.error("failed to add user:", error);
    }
}


export async function getUserIdByName(name) {
  try {
    const q = query(collection(db, "roommates"), where("name", "==", name));
    const snapshot = getDocs(q);

    const docs = snapshot?.docs;
    if (!docs || docs.length === 0) {
      console.log("No user found with name:", name);
      return null;
    }

    return docs[0].id;
  } catch (error) {
    console.error("Error in getUserIdByName:", error);
    return null;
  }
}