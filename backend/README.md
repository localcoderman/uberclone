# Backend API Documentation

## `POST /api/users/register` (registerUser)

Creates a new user and returns an auth token.

### Request

- **Method**: `POST`
- **URL**: `/api/users/register`
- **Headers**
  - **Content-Type**: `application/json`

#### Body (JSON)

```json
{
  "fullname": {
    "firstname": "Abdullah",
    "lastname": "Khan"
  },
  "email": "abdullah@example.com",
  "password": "secret123"
}
```

#### Field requirements

- **fullname.firstname** (string, required): minimum length **6**
- **fullname.lastname** (string, optional): if provided, minimum length **6** (model validation)
- **email** (string, required): must be a valid email
- **password** (string, required): minimum length **6**

### Responses

#### `201 Created`

Returned when the user is created successfully.

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "…",
    "fullname": { "firstname": "Abdullah", "lastname": "Khan" },
    "email": "abdullah@example.com",
    "socketid": null,
    "createdAt": "…",
    "updatedAt": "…",
    "__v": 0
  },
  "token": "…"
}
```

Notes:
- The password is **not** returned (it is excluded by the model with `select: false`).
- `token` is a JWT signed with `process.env.TOKEN_SECRET` and expires in **24h**.

#### `400 Bad Request`

Returned when validation fails (from `express-validator` in the route).

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "First name is required",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

#### `500 Internal Server Error`

Not explicitly handled in the controller. Example causes:
- Duplicate email (unique index violation)
- Database connection/model errors

### Example cURL

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d "{\"fullname\":{\"firstname\":\"Abdullah\",\"lastname\":\"Khan\"},\"email\":\"abdullah@example.com\",\"password\":\"secret123\"}"
```

