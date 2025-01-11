# /users/register Endpoint Documentation

## Endpoint Description

The `/users/register` endpoint allows a new user to register by providing their details such as full name, email, and password. The endpoint validates the input data and creates a new user in the database if all the required conditions are met.

### URL

```
POST /users/register
```

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field                | Type   | Required | Description                                                |
| -------------------- | ------ | -------- | ---------------------------------------------------------- |
| `email`              | String | Yes      | The user's email address. Must be a valid email.           |
| `fullName.firstName` | String | Yes      | The user's first name. Must be at least 3 characters long. |
| `fullName.lastName`  | String | No       | The user's last name. This field is optional.              |
| `password`           | String | Yes      | The user's password. Must be at least 8 characters long.   |

### Example Request Body

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

### Response

#### Success Response

- **Status Code**: `201 Created`
- **Description**: The user is successfully registered and a token is generated.
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

#### Validation Error Response

- **Status Code**: `400 Bad Request`
- **Description**: Input validation failed.
- **Response Body**:

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be at least 8 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Internal Server Error Response

- **Status Code**: `500 Internal Server Error`
- **Description**: An unexpected error occurred on the server.
- **Response Body**:

```json
{
  "error": "Something went wrong. Please try again later."
}
```

### Validation Rules

1. **Email**: Must be a valid email address.
2. **First Name**: Must be at least 3 characters long.
3. **Password**: Must be at least 8 characters long.

### How to Use

1. Make a `POST` request to `/users/register`.
2. Include the required fields in the request body.
3. Ensure the data satisfies the validation rules.
4. If successful, you will receive a JWT token and user details in the response.

---

# /users/login Endpoint Documentation

## Endpoint Description

The `/users/login` endpoint allows existing users to log in by providing their email and password. If the credentials are valid, the endpoint returns a JSON Web Token (JWT) and the user details.

### URL

```
POST /users/login
```

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field      | Type   | Required | Description                                              |
| ---------- | ------ | -------- | -------------------------------------------------------- |
| `email`    | String | Yes      | The user's email address. Must be a valid email.         |
| `password` | String | Yes      | The user's password. Must be at least 8 characters long. |

### Example Request Body

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Response

#### Success Response

- **Status Code**: `200 OK`
- **Description**: The user is successfully logged in, and a token is returned.
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

#### Invalid Credentials Response

- **Status Code**: `401 Unauthorized`
- **Description**: Email or password is incorrect.
- **Response Body**:

```json
{
  "message": "Invalid email or password"
}
```

#### Validation Error Response

- **Status Code**: `400 Bad Request`
- **Description**: Input validation failed.
- **Response Body**:

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 8 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Internal Server Error Response

- **Status Code**: `500 Internal Server Error`
- **Description**: An unexpected error occurred on the server.
- **Response Body**:

```json
{
  "error": "Something went wrong. Please try again later."
}
```

### Validation Rules

1. **Email**: Must be a valid email address.
2. **Password**: Must be at least 8 characters long.

### How to Use

1. Make a `POST` request to `/users/login`.
2. Include the required fields in the request body.
3. Ensure the data satisfies the validation rules.
4. If successful, you will receive a JWT token and user details in the response.

---

## /users/profile Endpoint Documentation

### Endpoint Description

The `/users/profile` endpoint retrieves the profile information of the authenticated user. The user must be logged in with a valid JWT token to access this endpoint.

### URL

GET /users/profile

### Request Headers

The request must include a valid JWT token in either the `Authorization` header or as a cookie.

| Header        | Type   | Required | Description                             |
| ------------- | ------ | -------- | --------------------------------------- |
| Authorization | String | Yes      | A Bearer token for user authentication. |

### Example Request Headers

```http
GET /users/profile HTTP/1.1
Authorization: Bearer <JWT Token>
```

### Response

#### Success Response

**Status Code:** 200 OK

**Description:** Successfully retrieves the user profile.

**Response Body:**

```json
{
  "_id": "63f4d1e1b5a8b4cd12345678",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "user@example.com"
}
```

#### Unauthorized Response

**Status Code:** 401 Unauthorized

**Description:** The user is not authenticated.

**Response Body:**

```json
{
  "message": "Unauthorized"
}
```

### Validation Rules

- The JWT token must be valid and not blacklisted.
- The user associated with the token must exist in the database.

### How to Use

- Make a GET request to `/users/profile`.
- Include the JWT token in the `Authorization` header as a Bearer token or as a cookie.
- If authenticated, the server will return the user’s profile information.

---

## /users/logout Endpoint Documentation

### Endpoint Description

The `/users/logout` endpoint logs out the authenticated user by invalidating the current JWT token. This is done by adding the token to a blacklist and clearing the token cookie.

### URL

GET /users/logout

### Request Headers

The request must include a valid JWT token in either the `Authorization` header or as a cookie.

| Header        | Type   | Required | Description                             |
| ------------- | ------ | -------- | --------------------------------------- |
| Authorization | String | Yes      | A Bearer token for user authentication. |

### Example Request Headers

```http
GET /users/logout HTTP/1.1
Authorization: Bearer <JWT Token>
```

### Response

#### Success Response

**Status Code:** 200 OK

**Description:** The user is successfully logged out.

**Response Body:**

```json
{
  "message": "Logged Out"
}
```

#### Unauthorized Response

**Status Code:** 401 Unauthorized

**Description:** The user is not authenticated or the token is blacklisted.

**Response Body:**

```json
{
  "message": "Unauthorized"
}
```

### Validation Rules

- The JWT token must be valid.
- The token must not already be blacklisted.

### How to Use

- Make a GET request to `/users/logout`.
- Include the JWT token in the `Authorization` header as a Bearer token or as a cookie.
- If authenticated, the server will invalidate the token and clear the cookie.
