# Kaira AI - Mental Wellbeing Chatbot

## Project Overview

Kaira AI is a React-based web application that provides a mental wellbeing chatbot interface. The application uses the Gemini AI model from Google to generate responses to user queries, offering mental health support and advice.

## Project Structure

The project is built using React and Vite, with the following main components:

- `src/`
  - `components/`
    - `Main/`
      - `Main.jsx`
      - `Main.css`
    - `Sidebar/`
      - `Sidebar.jsx`
      - `Sidebar.css`
  - `assets/`
    - `assets.js`
    - (various icon images)
  - `config/`
    - `gemini.js`
    - `aiConfig.js`
  - `context/`
    - `Context.jsx`
  - `App.jsx`
  - `main.jsx`
  - `index.css`

## Key Components and Their Functions

### 1. Main.jsx

This is the primary component of the application. It renders the chat interface, including:
- The navigation bar with the Kaira AI logo
- The chat history display
- The input area for user prompts
- Suggestion cards for common mental health issues

Key features:
- Displays chat history using the `chatHistory` state from the Context
- Renders a loading animation when waiting for AI responses
- Provides an input field for user prompts
- Offers quick-access cards for common mental health topics

### 2. Sidebar.jsx

This component provides navigation and history functionality:
- Allows users to start a new chat
- Displays recent chat history
- Provides access to help, activity, and settings (functionality not implemented)

### 3. Context.jsx

This file sets up the React Context API to manage the application's state. It includes:
- State management for chat history, user input, and AI responses
- The `onSent` function that handles sending user prompts to the AI and processing responses
- Formatting functions for AI responses

### 4. gemini.js

This file contains the configuration and implementation for interacting with the Gemini AI model:
- Sets up the AI model configuration
- Implements the `runChat` function that sends prompts to the AI and receives responses

### 5. assets.js

This file imports and exports all the icon images used in the application, making them easily accessible throughout the project.

### 6. App.jsx

The main application component that renders the Sidebar and Main components.

### 7. main.jsx

The entry point of the React application, which renders the App component wrapped in the ContextProvider.

## How It Works

1. When a user enters a prompt and sends it:
   - The `onSent` function in `Context.jsx` is triggered
   - It sends the prompt to the Gemini AI using the `runChat` function from `gemini.js`
   - The response is formatted and added to the chat history

2. The Main component continuously renders the updated chat history, showing both user prompts and AI responses.

3. The Sidebar component allows users to start new chats and access their chat history.

## CSS Styling

- `Main.css` and `Sidebar.css` provide the styling for the main interface and sidebar respectively.
- `index.css` contains global styles and animations.

## Setup and Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your Gemini AI API key in `src/config/gemini.js`
4. Run the development server: `npm run dev`

## Contributing

Contributions to improve Kaira AI are welcome. Please follow these steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request


## Acknowledgments

- This project uses the Gemini AI model from Google
- Icons and assets from official gemini site
