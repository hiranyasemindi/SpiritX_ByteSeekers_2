# Spirit11 - Fantasy Cricket League Platform

Spirit11 is a fantasy cricket league platform developed during a 36-hour hackathon as part of the SpiritX 2025 event. The platform allows users to create and manage their dream cricket teams using real university player data. Users can analyze player statistics, manage budgets, and compete on a leaderboard. The platform also features an AI-powered chatbot named "Spiriter" that assists users in making smart team selections.

## Project Overview

The project consists of three main components:

1. **Admin Panel**: For managing players and their statistics.
2. **User Interface**: For team creation and management.
3. **Spiriter Chatbot**: An AI-powered chatbot that assists users in making informed team selections.

The application was developed by:
- [@iamvirul](https://github.com/iamvirul)
- [@hiranyasemindi](https://github.com/hiranyasemindi)
- [@tilaknagunawardhane](https://github.com/tilaknagunawardhane)
- [@Threadstone15 (Udeepa Gallage)](https://github.com/Threadstone15)

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js** installed on your machine.
- **Firebase** account with a project set up.
- **OpenAI API Key** for the AI-powered chatbot.

## Steps to Run the Project

### 1. Clone the Repository

First, clone the project repository using the following command:

```bash
git clone https://github.com/hiranyasemindi/spirit11.git
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd spirit11
npm install
```

### 3. Set Up Firebase

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and enable the **Realtime Database** service.

2. **Configure Firebase SDK**:
   - In the Firebase Console, go to **Project Settings** > **General**.
   - Under **Your apps**, add a new web app if you haven't already.
   - Copy the Firebase configuration object (it will look something like this):

     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

   - Replace the placeholder values in `src/services/firebase.js` with your Firebase configuration.

### 4. Set Up OpenAI API Key

1. **Get Your OpenAI API Key**:
   - Go to the [OpenAI Dashboard](https://platform.openai.com/).
   - Generate an API key if you don't already have one.

2. **Configure the API Key**:
   - Open the file `src/utils/chatbotUtils.js`.
   - Replace the placeholder with your OpenAI API key:

     ```javascript
     const openAIKey = "PLACE_YOUR_OPENAI_API_KEY_HERE";
     ```

### 5. Run the Application

Once all the configurations are in place, you can start the application:

```bash
npm start
```

The application should now be running on `http://localhost:3000`.

## Features

- **User Interface**:
  - Create and manage your fantasy cricket team.
  - Analyze player statistics and manage your budget.
  - Compete on the leaderboard with other users.

- **Admin Panel**:
  - Manage player data and statistics.
  - Update player information and performance metrics.

- **Spiriter Chatbot**:
  - AI-powered assistance for team selection.
  - Provides recommendations based on player statistics and budget.

## Acknowledgments

- **Firebase** for providing the real-time database service.
- **OpenAI** for powering the Spiriter chatbot.
- **SpiritX 2025** for organizing the hackathon.

---

Enjoy building your dream cricket team with Spirit11! 🏏
