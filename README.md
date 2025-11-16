# Technica - Roommate Management Application

A web application for managing roommates, schedules, chores, and finances.

## Setup Instructions

### Prerequisites
- Node.js installed on your system

### Running the Application

1. **Open the project in VSCode**
   - Open the folder containing this project in VSCode

2. **Start the server**
   - Open a terminal in VSCode (Terminal → New Terminal)
   - Run the following command:
     ```bash
     npm start
     ```
   - Or manually:
     ```bash
     node server.js
     ```

3. **Open in browser**
   - The server will start on `http://localhost:8080`
   - Open your browser and navigate to: `http://localhost:8080`
   - Or use the VSCode debugger (F5) with the "Launch Chrome against localhost" configuration

### Troubleshooting

**Server won't start:**
- Make sure port 8080 is not already in use
- Check that Node.js is installed: `node --version`
- Check for errors in the terminal

**Page not loading:**
- Make sure the server is running (you should see "Server running at http://localhost:8080/" in the terminal)
- Check the browser console for errors (F12 → Console tab)
- Verify all files are in the correct location

**API not working:**
- Ensure the server is running
- Check browser console for CORS or network errors
- Verify the server is responding at `http://localhost:8080/roommates`

## Project Structure

- `index.html` - Main HTML file
- `index.js` - Frontend JavaScript
- `style.css` - Stylesheet
- `server.js` - Node.js server
- `package.json` - Project configuration
- `cloud_background.jpg` - Background image

## Features

- Roommate Status tracking
- Daily Schedule management
- Chores assignment and tracking
- Finances/Bills management
- Live clock display
