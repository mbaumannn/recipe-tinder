# Recipe Tinder App

A Tinder-style recipe discovery application built with React, Firebase, and Material-UI.

## Features

- Swipe through recipes Tinder-style
- Save favorite recipes
- Filter recipes by cuisine and cooking time
- Personal pantry management
- Recipe upload functionality
- User authentication and profile management

## Tech Stack

- Frontend:
  - React
  - Material-UI
  - Redux Toolkit
  - React Router
  - TypeScript
  - PWA support

- Backend:
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Storage
  - Firebase Functions

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd recipe-tinder
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a Firebase project and enable:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage

4. Create a \`.env\` file in the root directory with your Firebase configuration:
\`\`\`env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
\`\`\`

5. Start the development server:
\`\`\`bash
npm start
\`\`\`

## Project Structure

\`\`\`
recipe-tinder/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── store/          # Redux store and slices
│   ├── services/       # API and utility functions
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   └── firebase.ts     # Firebase configuration
├── public/
└── package.json
\`\`\`

## Available Scripts

- \`npm start\`: Run the development server
- \`npm build\`: Build for production
- \`npm test\`: Run tests
- \`npm run eject\`: Eject from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
