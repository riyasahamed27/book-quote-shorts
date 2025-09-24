📚 Book Quotes App

A full-stack application for browsing and interacting with inspirational book quotes. The project is split into a frontend (React + Tailwind CSS) and a backend (Express + MySQL).

Database Schema(Mysql)

-- Create database
CREATE DATABASE IF NOT EXISTS book_quotes_db;
USE book_quotes_db;

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_author (author),
    INDEX idx_book_title (book_title),
    INDEX idx_created_at (created_at),
    INDEX idx_likes_count (likes_count),
    
    -- Full-text search index for text content
    FULLTEXT(text, author, book_title)
);

-- Create users table (for future features like user accounts)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Create user_likes table (for tracking which users liked which quotes)
CREATE TABLE IF NOT EXISTS user_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    quote_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_quote (user_id, quote_id),
    INDEX idx_user_id (user_id),
    INDEX idx_quote_id (quote_id)
);

-- Create categories table (for organizing quotes by genre/topic)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_name (name)
);

-- Create quote_categories table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS quote_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT,
    category_id INT,
    
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_quote_category (quote_id, category_id),
    INDEX idx_quote_id (quote_id),
    INDEX idx_category_id (category_id)
);

-- Insert sample data
INSERT INTO quotes (text, author, book_title) VALUES
('The only way to do great work is to love what you do.', 'Steve Jobs', 'Various Interviews'),
('Innovation distinguishes between a leader and a follower.', 'Steve Jobs', 'Keynote Speeches'),
('Life is what happens to you while you\'re busy making other plans.', 'John Lennon', 'Beautiful Boy Lyrics'),
('The future belongs to those who believe in the beauty of their dreams.', 'Eleanor Roosevelt', 'Various Speeches'),
('It is during our darkest moments that we must focus to see the light.', 'Aristotle', 'Philosophy Works'),
('Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Winston Churchill', 'Wartime Speeches'),
('The only impossible journey is the one you never begin.', 'Tony Robbins', 'Motivational Talks'),
('In the middle of difficulty lies opportunity.', 'Albert Einstein', 'Scientific Papers'),
('Be yourself; everyone else is already taken.', 'Oscar Wilde', 'Various Works'),
('Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.', 'Albert Einstein', 'Attributed Quotes');

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Motivation', 'Inspiring and motivational quotes'),
('Philosophy', 'Deep philosophical thoughts and wisdom'),
('Success', 'Quotes about achieving success and goals'),
('Life', 'General life wisdom and observations'),
('Leadership', 'Quotes about leadership and influence'),
('Innovation', 'Quotes about creativity and innovation');

-- Associate quotes with categories (sample data)
INSERT INTO quote_categories (quote_id, category_id) VALUES
(1, 1), (1, 3), -- Steve Jobs quote: Motivation, Success
(2, 5), (2, 6), -- Steve Jobs innovation: Leadership, Innovation  
(3, 4),         -- John Lennon: Life
(4, 1), (4, 4), -- Eleanor Roosevelt: Motivation, Life
(5, 2), (5, 1), -- Aristotle: Philosophy, Motivation
(6, 3), (6, 5), -- Churchill: Success, Leadership
(7, 1), (7, 3), -- Tony Robbins: Motivation, Success
(8, 6), (8, 3), -- Einstein opportunity: Innovation, Success
(9, 4), (9, 2), -- Oscar Wilde: Life, Philosophy
(10, 2);        -- Einstein universe: Philosophy

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
