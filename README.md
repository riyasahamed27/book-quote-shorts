📚 Book Quotes App

A full-stack application for browsing and interacting with inspirational book quotes. The project is split into a frontend (React + Tailwind CSS) and a backend (Express + MySQL).

🚀 Frontend (book-quotes-frontend)

The frontend is built with React 19, styled with Tailwind CSS, and powered by Create React App.

Key Dependencies

react / react-dom → Core React library for building UI.

react-scripts → CRA scripts for starting, building, and testing the app.

lucide-react → Icon library used for modern SVG icons.

@testing-library/react / jest-dom / user-event → Testing utilities for unit and integration testing.

tailwindcss / postcss / autoprefixer → Utility-first CSS framework and tooling for styling.

web-vitals → Performance measurement tools.

Scripts

npm start → Run the development server.

npm run build → Create a production build.

npm test → Run test suite.

npm run eject → Eject CRA configs.

Proxy

The frontend proxies API calls to the backend at:

http://localhost:5000

🛠 Backend (book-quotes-backend)

The backend is a Node.js + Express server connected to a MySQL database. It exposes APIs for retrieving and interacting with quotes.

Key Dependencies

express → Web framework to handle routes & APIs.

mysql2 → MySQL client for database queries.

cors → Enable cross-origin requests from the frontend.

Dev Dependencies

nodemon → Auto-restarts the server during development.

Scripts

npm start → Run server with Node.

npm run dev → Run server with Nodemon (recommended for development).

⚙️ How to Run
1. Clone the repo
git clone https://github.com/your-username/book-quotes-app.git
cd book-quotes-app

2. Install dependencies for both frontend & backend
cd book-quotes-frontend
npm install

cd ../book-quotes-backend
npm install

3. Start backend
cd book-quotes-backend
npm run dev

4. Start frontend
cd book-quotes-frontend
npm start


Frontend will be available at http://localhost:3000

Backend will be available at http://localhost:5000

📦 Project Structure
book-quotes-app/
├── book-quotes-frontend/   # React + Tailwind frontend
│   └── package.json
├── book-quotes-backend/    # Express + MySQL backend
│   └── package.json
└── README.md

📝 Features

Browse inspirational quotes.

Like & share quotes.

Auto-play mode for quotes.

MySQL storage & Express API backend.
