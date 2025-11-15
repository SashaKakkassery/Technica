const mainRoom = document.querySelector(".mainRoom");

const buttons = {
    roommates: document.querySelectorAll("button")[0],
    schedule:  document.querySelectorAll("button")[1],
    chores:    document.querySelectorAll("button")[2],
    finances:  document.querySelectorAll("button")[3],
};

// API Helpers --> EDIT

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

function fadeIn(element) {
    element.style.opacity = 0;
    setTimeout(() => element.style.opacity = 1, 10);
}

// Roommate Status

async function loadRoommateStatus() {
    mainRoom.innerHTML = "<h2>Loading roommate status...</h2>";

    const data = await apiGET("roommates");

    if (data.error) {
        mainRoom.innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }

    mainRoom.innerHTML = `
        <h2>Roommate Status</h2>
        <div class="panelList">
            ${data.map(r => `
                <div class="panelItem">
                    <strong>${r.username}</strong><br>
                    Status: ${r.isAvailable ? "Available" : "Busy"}<br>
                    Activity: ${r.activity || "None"}
                </div>
            `).join("")}
        </div>
    `;

    fadeIn(mainRoom);
}

// Daily Schedule

async function loadDailySchedule() {
    mainRoom.innerHTML = "<h2>Loading schedule...</h2>";

    const data = await apiGET("schedule");

    if (data.error) {
        mainRoom.innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }

    mainRoom.innerHTML = `
        <h2>Daily Schedule & Quiet Hours</h2>
        <div class="panelList">
            ${data.map(s => `
                <div class="panelItem">
                    <strong>${s.day}</strong><br>
                    Quiet Hours: ${s.quietHours}<br>
                    Availability: ${s.availability}
                </div>
            `).join("")}
        </div>
    `;

    fadeIn(mainRoom);
}

// Chores

async function loadChores() {
    mainRoom.innerHTML = "<h2>Loading chores...</h2>";

    const data = await apiGET("chores");

    if (data.error) {
        mainRoom.innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }

    mainRoom.innerHTML = `
    <h2>Chores</h2>
    <div class="panelList">
        ${data.map(task => `
            <div class="panelItem">
                <strong>${task.task}</strong><br>
                Assigned To: ${task.assignedTo}<br>
                Status: ${task.completed ? "\u2714 Done" : "\u274C Not Done"}<br>
                ${!task.completed ? `
                <button class="completeBtn" data-id="${task.id}">
                    Mark Complete
                </button>` : ""}
            </div>
        `).join("")}
    </div>
`;

document.querySelectorAll(".completeBtn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");

            await apiPOST("chores/complete", { id });

            loadChores(); 
        });
    });

    fadeIn(mainRoom);
}

//  Bills

async function loadFinances() {
    mainRoom.innerHTML = "<h2>Loading finances...</h2>";

    const data = await apiGET("bills");

    if (data.error) {
        mainRoom.innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }

    mainRoom.innerHTML = `
        <h2>Finances / Bills</h2>
        <div class="panelList">
            ${data.map(bill => `
                <div class="panelItem">
                    <strong>${bill.name}</strong><br>
                    Amount: $${bill.amount}<br>
                    Owes: ${bill.owedBy}<br>
                    Due: ${bill.dueDate}<br>
                    Status: ${bill.paid ? "Paid" : "Unpaid"}
                </div>
            `).join("")}
        </div>
    `;

    fadeIn(mainRoom);
}

buttons.roommates.addEventListener("click", loadRoommateStatus);
buttons.schedule.addEventListener("click", loadDailySchedule);
buttons.chores.addEventListener("click", loadChores);
buttons.finances.addEventListener("click", loadFinances);

loadRoommateStatus();