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

---

## `POST /api/users/login` (loginUser)

Logs in an existing user and returns an auth token.

### Request

- **Method**: `POST`
- **URL**: `/api/users/login`
- **Headers**
  - **Content-Type**: `application/json`

#### Body (JSON)

```json
{
  "email": "abdullah@example.com",
  "password": "secret123"
}
```

#### Field requirements

- **email** (string, required): must be a valid email
- **password** (string, required): minimum length **6**

### Responses

#### `201 Created`

Returned when the email/password is valid.

```json
{
  "finalCall": {
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
- `token` is a JWT signed with `process.env.TOKEN_SECRET` and expires in **24h**.

#### `400 Bad Request`

Returned when validation fails (from `express-validator` in the route).

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Email is required",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`

Returned when the account doesn't exist or password is wrong.

```json
{
  "Message": "Invalid Email or Password"
}
```

Or:

```json
{
  "Message": "Incorrect Password"
}
```

### Example cURL

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"abdullah@example.com\",\"password\":\"secret123\"}"
```

---

## `GET /api/users/profile` (getUserProfile)

Returns the authenticated user document. Requires a valid JWT that is not blacklisted.

### Request

- **Method**: `GET`
- **URL**: `/api/users/profile`
- **Headers** (use one of the following)
  - **Cookie**: `token=<JWT>` (set automatically after login if your client uses cookies)
  - **Authorization**: `Bearer <JWT>`

No request body.

### Responses

#### `201 Created`

Returned when the token is valid and the user exists. Body is the user document (same shape as in register/login responses).

```json
{
  "_id": "…",
  "fullname": { "firstname": "Abdullah", "lastname": "Khan" },
  "email": "abdullah@example.com",
  "socketid": null,
  "createdAt": "…",
  "updatedAt": "…",
  "__v": 0
}
```

#### `401 Unauthorized`

Returned when:

- No token is provided
- The token is on the blacklist (e.g. after logout)
- The token is invalid or expired
- The user id in the token no longer exists in the database

Example shapes:

```json
{
  "message": "Unauthorization"
}
```

```json
{
  "message": "Unauthorization Access"
}
```

```json
{
  "message": "Unauthorized Access"
}
```

### Example cURL

```bash
# With Bearer token
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <your-jwt>"

# With cookie (after login set cookie on the same host)
curl -X GET http://localhost:3000/api/users/profile \
  -H "Cookie: token=<your-jwt>"
```

---

## `GET /api/users/logout` (userLogout)

Invalidates the current session JWT by adding it to a blacklist, clears the `token` cookie, and confirms logout.

### Request

- **Method**: `GET`
- **URL**: `/api/users/logout`
- **Headers** (same as profile)
  - **Cookie**: `token=<JWT>`
  - **Authorization**: `Bearer <JWT>`

No request body.

### Responses

#### `201 Created`

Returned when logout succeeds.

```json
{
  "message": "successfully LogOut"
}
```

#### `401 Unauthorized`

Same conditions as `GET /api/users/profile` (missing, invalid, expired, or blacklisted token).

### Example cURL

```bash
curl -X GET http://localhost:3000/api/users/logout \
  -H "Authorization: Bearer <your-jwt>"
```

Notes:

- After logout, the same JWT must not be reused; `authMiddleware` rejects blacklisted tokens.

---

## `POST /api/captains/register` (captainRegister)

Creates a new captain account and returns the captain document plus a JWT.

### Request

- **Method**: `POST`
- **URL**: `/api/captains/register`
- **Headers**
  - **Content-Type**: `application/json`

#### Body (JSON)

```json
{
  "fullname": {
    "firstname": "Abdullah",
    "lastname": "Khan"
  },
  "email": "captain@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field requirements (route validation)

- **fullname.firstname** (string, required): minimum length **3**
- **fullname.lastname** (string, optional in the route): if provided, the model requires minimum length **3**
- **email** (string, required): valid email format
- **password** (string, required): minimum length **6**
- **vehicle.color** (string, required): minimum length **3**
- **vehicle.plate** (string, required): minimum length **3**
- **vehicle.capacity** (integer, required): minimum value **1**
- **vehicle.vehicleType** (string, required): one of **`car`**, **`autoRiksha`**, **`motorcycle`** (spelling matches the API)

### Responses

#### `201 Created` (success)

Returned when the captain is created successfully.

```json
{
  "captain": {
    "_id": "…",
    "fullname": { "firstname": "Abdullah", "lastname": "Khan" },
    "email": "captain@example.com",
    "socketId": null,
    "status": "inActive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "…",
    "updatedAt": "…",
    "__v": 0
  },
  "token": "…"
}
```

Notes:

- **`status`** defaults to **`inActive`** (`active` | `inActive`).
- **`token`** is a JWT signed with `process.env.TOKEN_SECRET` and expires in **24h** (payload includes `_id`).
- **`password`** is stored with `select: false` on the model (same pattern as users).

#### `201 Created` (validation errors)

The controller returns **201** with an **`error`** array when `express-validator` fails (status code is not `400` in the current implementation).

```json
{
  "error": [
    {
      "type": "field",
      "msg": "First name must be at least 3 character Long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`

Returned when a captain with the same **email** already exists.

```json
{
  "message": "Captain Already Exist"
}
```

#### `500 Internal Server Error`

Not explicitly handled in the controller. Example causes:

- Duplicate email (unique index) if the existence check races with another request
- Database or Mongoose errors
- `captainService.createCaptain` throws if required fields are missing (should normally be prevented by route validation)

### Example cURL

```bash
curl -X POST http://localhost:3000/api/captains/register \
  -H "Content-Type: application/json" \
  -d "{\"fullname\":{\"firstname\":\"Abdullah\",\"lastname\":\"Khan\"},\"email\":\"captain@example.com\",\"password\":\"secret123\",\"vehicle\":{\"color\":\"Black\",\"plate\":\"ABC1234\",\"capacity\":4,\"vehicleType\":\"car\"}}"
```

