# Property Panga

Property Panga is a full-stack real estate platform designed to make buying, renting, or selling properties as smooth and hassle-free as possible. This project is built using modern web technologies including React, Redux, Firebase, Node.js, Express, and MongoDB.

## Features

- User Authentication (Sign Up, Sign In, Google OAuth)
- Create, Update, and Delete Listings
- Search and Filter Listings
- Contact Landlords
- User Profile Management
- Responsive Design

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Firebase**: Backend-as-a-Service (BaaS) for authentication and storage.
- **Vite**: Next-generation frontend tooling.

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and listing data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT**: JSON Web Tokens for secure user authentication.
- **bcryptjs**: Library to hash passwords.

## Project Structure

```
.
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── Pages
│   │   ├── redux
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── .env
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
├── server
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .env
│   ├── index.js
│   └── package.json
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/propertypanga.git
cd propertypanga
```

2. Install dependencies:

```sh
npm install
npm install --prefix client
```

3. Set up environment variables:

Create a 

.env

 file in the root directory and add your MongoDB URI and JWT secret:

```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

Create a 

.env

 file in the 

client

 directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

4. Run the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the client application.
- `npm start`: Start the production server.

## License

This project is licensed under the MIT License.

---

Thank you for taking the time to review my project.
Best regards,

Priyanshu Saxena
