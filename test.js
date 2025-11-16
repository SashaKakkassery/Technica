import { createUser, updateUser, deleteUser, getUserById, createRoommate, updateRoommate, deleteRoommate, getRoommateById } from "/BACKEND/functions.js"

// delete this once you guys know how to implement these methods 

/*
async function apiGET(endpoint) {
    try {
        const res = await fetch(`http://localhost:8080/${endpoint}`);
        return await res.json();
    } catch (err) {
        console.error("GET error:", err);
        return { error: "Failed to fetch data." };
    }
}

async function apiPOST(endpoint, data) {
    try {
        const res = await fetch(`http://localhost:8080/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (err) {
        console.error("POST error:", err);
        return { error: "Failed to send data." };
    }
}



*/