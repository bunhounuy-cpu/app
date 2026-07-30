# Course Management API

Backend server for the Student Course Management System built with **Node.js**, **Express 5**, and **MySQL**.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MySQL (via `mysql2/promise`)
- **Auth:** JWT (JSON Web Tokens) + bcryptjs
- **Roles:** `student`, `instructor`, `admin`

## Setup

### 1. Environment Variables

Copy `.env` and configure:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=course_management
SERVER_PORT=3000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

### 2. Install & Run

```bash
npm install
npm run dev     # development (nodemon)
npm start       # production
```

## API Reference

Base URL: `http://localhost:3000`

All responses follow a consistent format:

**Success:**
```json
{ "success": true, "msg": "...", "data": {...} }
```

**Error:**
```json
{ "success": false, "msg": "...", "errors": null }
```

---

### Health Check

```
GET /
```

Response: `200 OK`
```json
{ "success": true, "message": "Course Management API is running..." }
```

---

## Auth Endpoints

Base: `/api/auth`

### Register

```
POST /api/auth/register
```

Creates a new user account.

**Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User's full name |
| email | string | Yes | Unique email address |
| password | string | Yes | Account password |
| role | string | No | `student` or `instructor` (defaults to `student`; `admin` not allowed) |

**Success `201`:**
```json
{
  "success": true,
  "msg": "User registered successfully",
  "data": {
    "user": { "id": 1, "name": "...", "email": "...", "role": "student", "created_at": "..." },
    "token": "eyJhbG..."
  }
}
```

**Error `400`:** Missing required fields
**Error `409`:** Email already exists

### Login

```
POST /api/auth/login
```

**Body:**
| Field | Type | Required |
|-------|------|----------|
| email | string | Yes |
| password | string | Yes |

**Success `200`:**
```json
{
  "success": true,
  "msg": "Login successful",
  "data": {
    "user": { "id": 1, "name": "...", "email": "...", "role": "student", "created_at": "..." },
    "token": "eyJhbG..."
  }
}
```

**Error `401`:** Invalid email or password

### Get Current User

```
GET /api/auth/me
Authorization: Bearer <token>
```

**Success `200`:**
```json
{
  "success": true,
  "msg": "User profile retrieved successfully",
  "data": { "id": 1, "name": "...", "email": "...", "role": "student" }
}
```

**Error `401`:** No token or invalid/expired token

---

## Course Endpoints

Base: `/api/courses`

### Get All Courses (Public)

```
GET /api/courses
```

**Success `200`:**
```json
{
  "success": true,
  "msg": "Success",
  "data": [
    { "id": 1, "title": "...", "description": "...", "category": "...", "instructor_id": 2, "instructor_name": "Jane Instructor", "created_at": "..." }
  ]
}
```

### Get Course By ID (Public)

```
GET /api/courses/:id
```

**Success `200`:**
```json
{ "success": true, "msg": "Success", "data": { "id": 1, "title": "..." } }
```

**Error `404`:** Course not found

### Create Course (Instructor only)

```
POST /api/courses
Authorization: Bearer <token>
```

**Body:**
| Field | Type | Required |
|-------|------|----------|
| title | string | Yes |
| description | string | Yes |
| category | string | Yes |

**Success `201`:**
```json
{
  "success": true,
  "msg": "Course created successfully",
  "data": { "id": 1, "title": "...", "description": "...", "category": "...", "instructor_id": 2 }
}
```

**Error `400`:** Missing required fields
**Error `403`:** Not an instructor

### Update Course (Owner only)

```
PUT /api/courses/:id
Authorization: Bearer <token>
```

**Body:** (all required)
| Field | Type |
|-------|------|
| title | string |
| description | string |
| category | string |

**Success `200`:**
```json
{ "success": true, "msg": "Course updated successfully" }
```

**Error `400`:** Missing fields or update failed
**Error `403`:** Not the course owner
**Error `404`:** Course not found

### Delete Course (Owner only)

```
DELETE /api/courses/:id
Authorization: Bearer <token>
```

**Success `200`:**
```json
{ "success": true, "msg": "Course deleted successfully" }
```

**Error `403`:** Not the course owner
**Error `404`:** Course not found

---

## Enrollment Endpoints

Base: `/api/enrollments` (all require `student` role)

### Enroll in Course

```
POST /api/enrollments
Authorization: Bearer <token>
```

**Body:**
| Field | Type | Required |
|-------|------|----------|
| courseId | number | Yes |

**Success `201`:**
```json
{ "success": true, "msg": "Enrolled successfully" }
```

**Error `400`:** Missing courseId
**Error `404`:** Course not found
**Error `409`:** Already enrolled

### Get My Courses

```
GET /api/enrollments/my-courses
Authorization: Bearer <token>
```

**Success `200`:**
```json
{
  "success": true,
  "msg": "Success",
  "data": [
    { "enrollment_id": 1, "enrolled_at": "...", "course_id": 1, "title": "...", "description": "...", "category": "...", "instructor_name": "..." }
  ]
}
```

### Unenroll from Course

```
DELETE /api/enrollments/:courseId
Authorization: Bearer <token>
```

**Success `200`:**
```json
{ "success": true, "msg": "Unenrolled successfully" }
```

**Error `400`:** Missing courseId
**Error `404`:** Enrollment not found

---

## Dashboard Endpoints

Base: `/api/dashboard`

### Student Dashboard

```
GET /api/dashboard/student
Authorization: Bearer <token>
Role: student
```

**Success `200`:**
```json
{ "success": true, "msg": "Student dashboard retrieved successfully", "data": { "totalEnrolled": 3 } }
```

### Instructor Dashboard

```
GET /api/dashboard/instructor
Authorization: Bearer <token>
Role: instructor
```

**Success `200`:**
```json
{
  "success": true,
  "msg": "Instructor dashboard retrieved successfully",
  "data": [ { "id": 1, "title": "Course A", "total_students": 5 } ]
}
```

### Admin Dashboard

```
GET /api/dashboard/admin
Authorization: Bearer <token>
Role: admin
```

**Success `200`:**
```json
{
  "success": true,
  "msg": "Admin stats retrieved successfully",
  "data": { "totalStudents": 10, "totalInstructors": 3, "totalCourses": 8, "totalEnrollments": 25 }
}
```

---

## User Endpoints

Base: `/api/users` (all require authentication)

### Get Profile

```
GET /api/users/profile
Authorization: Bearer <token>
```

**Success `200`:**
```json
{ "success": true, "msg": "User profile retrieved successfully", "data": { "id": 1, "name": "...", "email": "...", "role": "student", "created_at": "..." } }
```

### Update Profile

```
PUT /api/users/profile
Authorization: Bearer <token>
```

**Body:**
| Field | Type | Required |
|-------|------|----------|
| name | string | Yes |
| email | string | Yes |

**Success `200`:**
```json
{ "success": true, "msg": "Profile updated successfully", "data": { "id": 1, "name": "...", "email": "...", "role": "student" } }
```

**Error `400`:** Missing fields
**Error `409`:** Email already in use by another account

### Get All Users (Admin only)

```
GET /api/users
Authorization: Bearer <token>
Role: admin
```

**Success `200`:**
```json
{ "success": true, "msg": "All users retrieved successfully", "data": [ { "id": 1, "name": "...", "email": "...", "role": "student", "created_at": "..." } ] }
```

### Delete User (Admin only)

```
DELETE /api/users/:id
Authorization: Bearer <token>
Role: admin
```

**Success `200`:**
```json
{ "success": true, "msg": "User deleted successfully" }
```

**Error `404`:** User not found

### Update User Role (Admin only)

```
PATCH /api/users/:id/role
Authorization: Bearer <token>
Role: admin
```

**Body:**
| Field | Type | Required |
|-------|------|----------|
| updateRole | string | Yes | `admin`, `instructor`, or `student` |

**Success `200`:**
```json
{ "success": true, "msg": "Role updated successfully", "data": { "id": 1, "name": "...", "email": "...", "role": "instructor" } }
```

**Error `400`:** Invalid role
**Error `403`:** Not an admin
**Error `404`:** User not found

---

## Admin Endpoint

Base: `/api/admin`

### Admin Dashboard (Welcome)

```
GET /api/admin/dashboard
Authorization: Bearer <token>
Role: admin
```

**Success `200`:**
```json
{ "message": "Welcome to the Admin Dashboard!" }
```

---

## Error Codes Summary

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (missing/invalid fields) |
| 401 | Unauthorized (no token or invalid token) |
| 403 | Forbidden (insufficient role/permission) |
| 404 | Resource not found |
| 409 | Conflict (duplicate email, already enrolled) |
| 500 | Internal server error |
