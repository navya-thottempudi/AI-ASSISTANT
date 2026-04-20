# AI Assistant (Full-Stack Conversational App)

## 🚀 Overview

This project is a full-stack AI-powered web application where users can ask questions and receive responses from an AI model. The backend integrates with the Groq API and stores interactions in MongoDB.

---

## 🛠 Tech Stack

### Frontend

* React (Vite)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### AI Model

* llama-3.1-8b-instant (via Groq API)

---

## ⚙️ Backend Implementation

The backend server is built using Express and provides API endpoints for interacting with the AI model and storing responses.

### Key Features:

* Accepts user questions via API
* Sends request to Groq AI API
* Receives and returns AI-generated response
* Stores question & response in MongoDB
* Provides optional history endpoint

---

## 📡 API Endpoints

### 1. Ask Question

**POST** `/ask`

#### Request:

```json
{
  "question": "What is AI?"
}
```

#### Response:

```json
{
  "answer": "AI stands for Artificial Intelligence..."
}
```

---

### 2. Get History (Optional)

**GET** `/history`

#### Response:

```json
[
  {
    "question": "What is AI?",
    "response": "AI stands for..."
  }
]
```

---

## 🧩 Backend Code Highlights

* MongoDB connection using environment variables
* Schema to store questions and responses
* Integration with Groq API using axios
* Error handling for API and database failures

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Run server:

```bash
node server.js
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

* Frontend deployed on Vercel
* Backend deployed on Vercel
* Both are configured as separate projects

---

## 🔐 Security Practices

* Environment variables used for sensitive data
* `.env` file excluded using `.gitignore`
* API keys are not exposed in the repository

---

## 📌 Notes

* Each request processes one question and returns one response
* Data is stored in MongoDB for persistence
* Chat history endpoint is optional and limited

---

## 👨‍💻 Author

Navya
