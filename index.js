let mainRoom;
let buttons = {};


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
        <div class="contentWrapper">
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

    // Get current time info
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Find today's schedule
    const todaySchedule = data.find(s => s.day === currentDay) || data[0];

    mainRoom.innerHTML = `
        <div class="clock">
            <div class="hour">
                <div class="hr" id="hr"></div>
            </div>
            <div class="minute">
                <div class="min" id="min"></div>
            </div>
            <div class="second">
                <div class="sec" id="sec"></div>
            </div>
            <span style="--i:1"><b>1</b></span>
            <span style="--i:2"><b>2</b></span>
            <span style="--i:3"><b>3</b></span>
            <span style="--i:4"><b>4</b></span>
            <span style="--i:5"><b>5</b></span>
            <span style="--i:6"><b>6</b></span>
            <span style="--i:7"><b>7</b></span>
            <span style="--i:8"><b>8</b></span>
            <span style="--i:9"><b>9</b></span>
            <span style="--i:10"><b>10</b></span>
            <span style="--i:11"><b>11</b></span>
            <span style="--i:12"><b>12</b></span>
        </div>
        <div class="scheduleContent">
            <h2>Daily Schedule & Quiet Hours</h2>
            <div class="currentTimeInfo">
                <p><strong>Current Time:</strong> ${currentTime}</p>
                <p><strong>Today:</strong> ${currentDay}</p>
            </div>
            <div class="panelList">
                ${data.map(s => {
                    const isToday = s.day === currentDay;
                    return `
                        <div class="panelItem ${isToday ? 'today' : ''}">
                            <strong>${s.day}</strong><br>
                            Quiet Hours: ${s.quietHours}<br>
                            Availability: ${s.availability}
                        </div>
                    `;
                }).join("")}
            </div>
        </div>
    `;

    // Re-initialize clock after adding it to DOM
    // Use setTimeout to ensure DOM is fully updated
    setTimeout(() => {
        const hr = document.getElementById("hr");
        const min = document.getElementById("min");
        const sec = document.getElementById("sec");

        if (hr && min && sec) {
            hr.style.transformOrigin = "bottom center";
            min.style.transformOrigin = "bottom center";
            sec.style.transformOrigin = "bottom center";
            updateClock();
        } else {
            console.error("Clock elements not found after schedule load");
        }
    }, 10);

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
    <div class="contentWrapper">
        <h2>Chores</h2>
        <div class="panelList">
            ${data.map(task => `
                <div class="panelItem" data-task-id="${task.id}">
                    <strong>${task.task}</strong><br>
                    Assigned To: ${task.assignedTo}<br>
                    Status: 
                    <label class="status-option">
                        <input type="radio" name="status-${task.id}" class="status-radio" value="done" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                        Done
                    </label>
                    <label class="status-option">
                        <input type="radio" name="status-${task.id}" class="status-radio" value="notdone" data-id="${task.id}" ${!task.completed ? 'checked' : ''}>
                        Not Done
                    </label>
                </div>
            `).join("")}
        </div>
    </div>
`;

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
        <div class="contentWrapper">
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
        </div>
    `;

    fadeIn(mainRoom);
}

//Clock

function updateClock() {
    const hr = document.getElementById("hr");
    const min = document.getElementById("min");
    const sec = document.getElementById("sec");

    // Only update if clock elements exist
    if (!hr || !min || !sec) {
        return;
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hrDeg = (hours % 12) * 30 + minutes * 0.5;
    const minDeg = minutes * 6;
    const secDeg = seconds * 6;

    hr.style.transform = `rotate(${hrDeg}deg)`;
    min.style.transform = `rotate(${minDeg}deg)`;
    sec.style.transform = `rotate(${secDeg}deg)`;
}

// Initialize clock if it exists on page load
const initialHr = document.getElementById("hr");
const initialMin = document.getElementById("min");
const initialSec = document.getElementById("sec");

if (initialHr && initialMin && initialSec) {
    initialHr.style.transformOrigin = "bottom center";
    initialMin.style.transformOrigin = "bottom center";
    initialSec.style.transformOrigin = "bottom center";
    updateClock();
}

// Update clock every second
setInterval(updateClock, 1000);

// Wait for DOM to be ready before setting up event listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // Get mainRoom and buttons after DOM is ready
    mainRoom = document.querySelector(".mainRoom");
    
    if (!mainRoom) {
        console.error("mainRoom element not found. Check your HTML structure.");
        return;
    }
    
    buttons = {
        roommates: document.querySelectorAll("button")[0],
        schedule:  document.querySelectorAll("button")[1],
        chores:    document.querySelectorAll("button")[2],
        finances:  document.querySelectorAll("button")[3],
    };
    
    // Verify buttons exist before adding event listeners
    if (buttons.roommates && buttons.schedule && buttons.chores && buttons.finances) {
        buttons.roommates.addEventListener("click", loadRoommateStatus);
        buttons.schedule.addEventListener("click", loadDailySchedule);
        buttons.chores.addEventListener("click", loadChores);
        buttons.finances.addEventListener("click", loadFinances);
        
        loadRoommateStatus();
    } else {
        console.error("Buttons not found. Make sure the HTML is loaded correctly.");
        console.log("Found buttons:", document.querySelectorAll("button").length);
    }
    
    // Set up event delegation for chore status 
    // This is set up once and works for all dynamically loaded content
    mainRoom.addEventListener("change", async (e) => {
        // Check if the changed element is a status
        if (e.target && e.target.classList.contains("status-radio") && e.target.checked) {
            const id = parseInt(e.target.getAttribute("data-id"));
            const isDone = e.target.value === "done";
            
            console.log(`Updating chore ${id} to ${isDone ? 'Done' : 'Not Done'}`);
            
            try {
                // Update on server and wait for response
                const result = await apiPOST(isDone ? "chores/complete" : "chores/incomplete", { id });
                
                console.log("Server response:", result);
                
                // Check if update was successful
                if (result && result.error) {
                    console.error("Server error:", result.error);
                    // If there's an error, reload to show correct state
                    await loadChores();
                } else {
                    // Success - reload to show updated state
                    await loadChores();
                }
            } catch (error) {
                console.error("Error updating chore status:", error);
                // Reload to show correct state
                await loadChores();
            }
        }
    });
}