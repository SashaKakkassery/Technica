import { app } from "./firebase.js";
import { doc, collection, addDoc, getFirestore, deleteDoc, updateDoc, getDocs, query, where  } from "firebase/firestore";

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

export function updateUser(name, updates) {
    try{
        const userId = getUserIdByName(name);
        if (!userId || typeof userId !== "string") {
        console.log("Invalid or missing user ID:", userId);
        return;
        }

        const userDoc = doc(db, "users", userId);
        updateDoc(userDoc, updates);
    } catch (error){
        console.error("failed to add user:", error);
    }
}

export async function destroyUser(name) {
  try {
    const userId = getUserIdByName(name);
    if (!userId || typeof userId !== "string") {
      console.log("Invalid or missing user ID:", userId);
      return;
    }

    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
    console.log("User deleted:", userId);
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
}



export async function getUserIdByName(name) {
  try {
    const q = query(collection(db, "users"), where("name", "==", name));
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





const user = {
    name: "Frank",
    password: "0000"
}

destroyUser("Frank");