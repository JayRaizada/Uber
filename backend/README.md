# /users/register Endpoint

## Overview
The `/users/register` endpoint allows users to register by providing full name, email, and password. The input is validated, and a new user is added to the database upon success.

### URL
```
POST /users/register
```

### Request Body
The body should be in JSON format with these fields:

| Field                | Type   | Required | Description                        |
| -------------------- | ------ | -------- | ---------------------------------- |
| `email`              | String | Yes      | Valid email address.               |
| `fullName.firstName` | String | Yes      | At least 3 characters.             |
| `fullName.lastName`  | String | No       | Optional.                          |
| `password`           | String | Yes      | At least 8 characters.             |

### Example Request
```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "securePassword123"
}
```

### Responses

#### Success
- **Status Code**: `201 Created`
- **Description**: User registered and token generated.
- **Response Body**:
```json
{
  "token": "<JWT Token>",
  "user": {
    "_id": "63f4d1e1b5a8b4cd12345678",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

#### Validation Error
- **Status Code**: `400 Bad Request`
- **Description**: Invalid input.
- **Response Body**:
```json
{
  "errors": [
    { "msg": "Invalid email", "param": "email" },
    { "msg": "First name must be at least 3 characters", "param": "fullName.firstName" },
    { "msg": "Password must be at least 8 characters", "param": "password" }
  ]
}
```

#### Server Error
- **Status Code**: `500 Internal Server Error`
- **Description**: Unexpected error.
- **Response Body**:
```json
{
  "error": "Something went wrong."
}
```

### Validation Rules
- **Email**: Must be valid.
- **First Name**: At least 3 characters.
- **Password**: At least 8 characters.

### Usage
1. Send a `POST` request to `/users/register`.
2. Include valid fields in the body.
3. On success, receive a JWT token and user details.

