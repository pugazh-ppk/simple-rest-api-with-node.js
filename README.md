# CodeOrbit Task 3 - Notes REST API

## Project Description
A simple REST API developed using Node.js and Express.js.

## Features
- Add new notes
- View all notes
- View individual notes
- Update existing notes
- Delete notes
- JSON response handling
- Error handling for invalid requests

## Technologies Used
- Node.js
- Express.js
- JavaScript
- Postman

## Installation

Install dependencies:

npm install

## Run the project

npm start

Server URL:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | View all notes |
| GET | /api/notes/:id | View one note |
| POST | /api/notes | Add a note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |

## Storage
Notes are stored temporarily using an in-memory JavaScript array.

## Testing
All API endpoints can be tested using Postman.
