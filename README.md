# NodeJs and Express Tutorial

## Description

This is a reference for the NodeJS and Express intro tutorial. You will be pushing code into this repository. Each branch shows what your code should look like (if you get stuck).

## Setup

1. Download or clone this repo
2. Install dependencies: `npm install`
3. Navigate to the root directory
4. Start the server file: `node server.js`

## API Endpoints

The server provides the following endpoints:

### GET Endpoints

- `GET /`: Home route, returns a welcome message
- `GET /api/people`: Returns all people
- `GET /api/people/:id`: Returns a specific person by ID

### POST Endpoints

- `POST /api/people`: Creates a new person
  - Required body parameters: `name` (string), `age` (number)

### PUT Endpoints

- `PUT /api/people/:id`: Updates a person by ID
  - Optional body parameters: `name` (string), `age` (number)

### DELETE Endpoints

- `DELETE /api/people/:id`: Deletes a person by ID

# Authentication

The API routes are secured with a simple token-based authentication. To access the API endpoints, you need to include an Authorization header with a Bearer token in your requests.

Example:
```
Authorization: Bearer secret-token
```

## Example Authenticated Requests

### GET all people with authentication
```
curl -H "Authorization: Bearer secret-token" http://localhost:4000/api/people
```

### POST with authentication
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer secret-token" -d '{"name":"Alice Williams","age":28}' http://localhost:4000/api/people
```

## Testing with Postman

You can use Postman to test the API endpoints. Here's how:

1. Open Postman
2. Create a new request
3. Select the HTTP method (GET, POST, PUT, DELETE)
4. Enter the URL (e.g., `http://localhost:4000/api/people`)
5. For POST and PUT requests, add the required body parameters in JSON format
6. Click "Send" to execute the request

## Example Requests

### GET all people
```
GET http://localhost:4000/api/people
```

### GET a specific person
```
GET http://localhost:4000/api/people/1
```

### Create a new person
```
POST http://localhost:4000/api/people
Content-Type: application/json

{
  "name": "Alice Williams",
  "age": 28
}
```

### Update a person
```
PUT http://localhost:4000/api/people/1
Content-Type: application/json

{
  "name": "John Smith",
  "age": 31
}
```

### Delete a person
```
DELETE http://localhost:4000/api/people/1
```