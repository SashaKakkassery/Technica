const http = require('http');    //// These might be problematic because 
const fs = require('fs');        //// I changed the "type" in package .json file 
const path = require('path');    //// to "module" 
const url = require('url');

const PORT = 8080;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Mock data
const mockData = {
    roommates: [
        { username: 'Alice', isAvailable: true, activity: 'Studying' },
        { username: 'Bob', isAvailable: false, activity: 'Sleeping' },
        { username: 'Charlie', isAvailable: true, activity: 'Cooking' }
    ],
    schedule: [
        { day: 'Monday', quietHours: '10:00 PM - 8:00 AM', availability: 'Available 2:00 PM - 6:00 PM' },
        { day: 'Tuesday', quietHours: '10:00 PM - 8:00 AM', availability: 'Available 1:00 PM - 5:00 PM' },
        { day: 'Wednesday', quietHours: '10:00 PM - 8:00 AM', availability: 'Available 2:00 PM - 6:00 PM' },
        { day: 'Thursday', quietHours: '10:00 PM - 8:00 AM', availability: 'Available 1:00 PM - 5:00 PM' },
        { day: 'Friday', quietHours: '11:00 PM - 9:00 AM', availability: 'Available all day' },
        { day: 'Saturday', quietHours: '12:00 AM - 10:00 AM', availability: 'Available all day' },
        { day: 'Sunday', quietHours: '10:00 PM - 8:00 AM', availability: 'Available 12:00 PM - 8:00 PM' }
    ],
    chores: [
        { id: 1, task: 'Dishes', assignedTo: 'Alice', completed: false },
        { id: 2, task: 'Trash', assignedTo: 'Bob', completed: true },
        { id: 3, task: 'Vacuum', assignedTo: 'Charlie', completed: false }
    ],
    bills: [
        { name: 'Rent', amount: 500, owedBy: 'Alice, Bob, Charlie', dueDate: '2024-01-01', paid: false },
        { name: 'Electricity', amount: 75, owedBy: 'Alice', dueDate: '2024-01-15', paid: true },
        { name: 'Internet', amount: 50, owedBy: 'Bob', dueDate: '2024-01-10', paid: false }
    ]
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Handle API endpoints
    if (pathname.startsWith('/roommates') && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockData.roommates));
        return;
    }

    if (pathname.startsWith('/schedule') && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockData.schedule));
        return;
    }

    if (pathname.startsWith('/chores')) {
        if (method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(mockData.chores));
            return;
        } else if (method === 'POST' && pathname.includes('/complete')) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    const chore = mockData.chores.find(c => c.id === data.id);
                    if (chore) {
                        chore.completed = true;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                } catch (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid request' }));
                }
            });
            return;
        }
    }

    if (pathname.startsWith('/bills') && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockData.bills));
        return;
    }

    // Serve static files
    let filePath = '.' + pathname;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 - File Not Found', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});


