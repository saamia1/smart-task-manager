# Smart Task Manager

This is a simple yet functional task management web application built using React for the frontend and Firebase Firestore for the backend.

## Why React and Firebase?

I chose React because I have prior experience working with it, which allows me to quickly build responsive, component-based user interfaces. For the backend, I used Firebase Firestore as it provides a flexible, real-time NoSQL cloud database that's easy to integrate with React and requires minimal backend setup.

### Features

Add, edit, and delete tasks

Mark tasks as complete or incomplete

Categorize tasks

View tasks by selected date

Automatically sync with Firebase Firestore

Responsive UI built with React components

### React Components

The application is modular and composed of the following key components:

App.js – Main component that brings everything together and manages state and layout.

Header.js – Displays the app title, progress bar for the day, and number of tasks completed vs total.

CalendarPanel.js – Lets users select a date to view tasks for that specific day.

TaskForm.js – A form to add new tasks including title, optional description, and deadline.

TaskList.js – Lists all tasks for the selected date and allows marking them complete or deleting.

TodayTaskWidget.js – Provides a quick overview of today’s tasks, separated from the main task list.

TaskService.js – A utility module that handles all Firebase Firestore interactions (CRUD operations).

### Room for Improvement

A major improvement could be implementing user authentication (login/signup), allowing users to create a personalized task management experience. Each user could then have their own Firestore collection of tasks.

### Database Schema (Firestore)

Each task is stored as a document in the Firestore collection, with the following fields:

Field	Type	Description
title	String	The title of the task (required)
description	String	Additional info about the task (optional)
completed	Boolean	Whether the task is complete or not
date	String	The date the task is associated with (format: YYYY-MM-DD)
deadline	String	Optional deadline for the task

How to Run the Project Locally
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies

bash
Copy
Edit
npm install
Set up Firebase

Create a project in Firebase Console

Enable Firestore

Create a .env file in the root with your Firebase config:

ini
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
Run the app

bash
Copy
Edit
npm start
The app will run at http://localhost:3000

Assumptions Made
One user uses the app at a time (no multi-user support).

Tasks are tied to a date, and users typically manage one day at a time.

Users do not require task reminders or push notifications yet.

Firestore collections are public (no auth rules in place).

🧾 Version Control
The project is managed using Git, and all code is pushed to a public GitHub repository for version tracking and collaboration.

📦 Tech Stack
Frontend: React (Create React App)

Backend: Firebase Firestore (NoSQL)

Version Control: Git & GitHub

📈 Future Enhancements
🔐 User login/signup (Firebase Auth)

📱 Mobile responsiveness

📊 Task analytics (completed vs pending)

📅 Calendar view for tasks

🕒 Task reminder notifications

🎨 Dark mode toggle
