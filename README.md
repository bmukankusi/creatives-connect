# CreativesConnect Platform

This project is a web platform where users can register, log in, and manage their profiles. 
Admin users can manage other users, view website analytics, manage advertisements, and add resources such as workshops, events, and courses. 
The project is built using Node.js, Express, MongoDB in backend, and Tailwindcss, EJS, and Javascript for frontend.


## Prerequisites

You must have the following installed before having the project locally:

Nodejs
MongoDB
Npm


## Installation

1. Clone the repository

2. Install dependencies:  npm install
  
## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

PORT=port number
MONGO_URI=database_url
JWT_SECRET=your_jwt_secret

## Running the Project
Start MongoDB:
Make sure your MongoDB server is running. If MongoDB is installed locally, you can start it using:
mongod

2. Start the server:

npm start

## API Endpoints
Here are some of the key API endpoints available in this project:
POST /api/users/register
POST /api/users/login
GET /api/users


## Admin Routes:
GET /api/admin/users
GET /api/admin/advertisements
POST /api/admin/resources
POST /api/admin/resources/attend/:id
GET /api/admin/resources

## Frontend
The project includes several HTML/ejs files to interact with the backend:
Register Page: register.ejs
Login Page: login.ejs
User Dashboard: dashboard.ejs
Admin Dashboard: admin.ejs
Home Page: Index.ejs
Profile page: profile.ejs
Resources page: resources.ejs
The project backend also includes javascript files, images, and package files :

## Backend
The project backend includes several directories:
Routes
Controllers 
Middleware
Config
Models
Admin Dashboard and
Server file

To use the frontend pages, simply open the HTML/ejs files in your browser. Make sure your server is running to handle the API requests and connected to MongoDB database.

