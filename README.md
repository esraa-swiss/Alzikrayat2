Alzikrayat - MERN Photo Sharing App

A full-stack photo sharing application built with MongoDB, Express.js, React.js and Node.js, following REST principles.

 Project Structure

alzikrayat/
├── client/   # React frontend (Vite)
└── server/   # Express REST API + Mongoose models
Prerequisites

- Node.js (v18 or newer)
- npm
- A MongoDB Atlas cluster (free M0 tier)
- Git

 Environment Variables

Create a file named .env inside the server/ folder. Never commit this file.

PORT=5000
MONGODB_URI=your_mongodb_connection_string
Replace your_mongodb_connection_string with your Atlas connection string, and add the database name alzikrayat before the ?.

 Setup & Run

 1. Start the server

cd server
npm install
node server.js
Expected output: Connected to MongoDB and Server running on http://localhost:5000.

 2. Start the client

In a second terminal:

cd client
npm install
npm run dev
Open http://localhost:5173. The Vite dev server proxies /api and /uploads requests to the Express server on port 5000, so both must be running.

 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user (bcrypt hashing) |
| POST | /api/auth/login | Login and return public profile |
| GET | /api/photos | List all photos |
| GET | /api/photos/:id | Get one photo |
| POST | /api/photos | Upload a photo (multipart form, field photo) |
| DELETE | /api/photos/:id | Delete a photo (owner only) |
| GET | /api/photos/:id/comments | List comments for a photo |
| POST | /api/photos/:id/comments | Add a comment to a photo |

 Notes

- Authentication is basic (no JWT). Protected actions identify the user by userId sent with the request. This is a simplification allowed by the project specification; JWT is an optional feature in Bonus Project 4.
- Login state is kept in React state only and is cleared on page refresh.

## Author

Esraa Mohamed Alamin - IT