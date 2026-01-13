# MongooseMeet - Event Management Platform API

> Scalable, Role-Based Event Management API built with MongoDB, Express, and Mongoose

A modern backend system for organizing, managing, and attending events. It handles authentication, role-based access, session scheduling, RSVP/waitlist handling, feedback, notifications, and logging — all while leveraging MongoDB's document strengths like subdocuments, virtuals, TTL indexes, and compound indexes.

## Key Features

### Authentication & Security

| Feature             | Implementation                                    |
| ------------------- | ------------------------------------------------- |
| JWT Auth            | Access + Refresh Tokens (securely stored/rotated) |
| Role-Based Access   | RBAC via middleware (requireRole)                 |
| Token Storage       | Refresh tokens stored in a separate collection    |
| Password Hashing    | bcryptjs inside Mongoose pre-hooks                |
| Security Middleware | Helmet, Rate-limiting, CORS                       |

### User & Role Management

- Register/Login with JWT-based sessions
- Roles like admin, organizer, attendee stored in Role model
- Profile update with role population
- Admin-only routes for managing users
- Soft delete supported

### Event & Session Management

- Events created by users (with createdBy ref)
- Each event has embedded sessions with title, speaker, timing, etc.
- Subdocuments used for sessions (inside Event model)
- Virtuals like totalDuration and numberOfSessions for analytics

### RSVP & Waitlist

- RSVP statuses: Going, Interested, Not Going
- One RSVP per user per event (compound index)
- Waitlist kicks in when event is full
- Prevents duplicate waitlist entries using (user, event) index

### Feedback System

- Users leave rating (1–5 stars) + comments on events
- Ratings validated inside schema
- Aggregation pipeline can be used for computing average rating per event

### Notification System

- Notify users about RSVP confirmations, event changes, or waitlist moves
- `status` unread/read for UI display
- TTL index optional for old auto-deletion

### Audit Logging

- Each major action (event update, RSVP, etc.) is logged
- Manual logging using a reusable plugin (req.user passed)
- Fields logged: user, action, target model, timestamp

## Tech Stack

| Category    | Technologies             |
| ----------- | ------------------------ |
| Runtime     | Node.js                  |
| Framework   | Express.js               |
| Database    | MongoDB with Mongoose    |
| Auth        | JWT, Refresh Tokens      |
| Security    | Helmet, CORS, RateLimit  |
| Module Type | ECMAScript Modules (ESM) |

## 📡 API Authentication

All protected endpoints require a valid access token in the Authorization header:

```
Authorization: Bearer <accessToken>
```

Refresh tokens are stored securely and rotated for extended sessions.

## 🔧 API Routes

### 🛂 Auth Routes

| Method | Endpoint       | Description          | Auth Required |
| ------ | -------------- | -------------------- | ------------- |
| POST   | /auth/register | Register new user    | ❌            |
| POST   | /auth/login    | Login & issue tokens | ❌            |
| POST   | /auth/refresh  | Rotate access token  | ✅ (cookie)   |
| POST   | /auth/logout   | Revoke session       | ✅            |

### 👤 User Routes

| Method | Endpoint    | Description                    | Auth Required |
| ------ | ----------- | ------------------------------ | ------------- |
| GET    | /user       | Get current user profile       | ✅            |
| GET    | /user/roles | Get roles associated with user | ✅            |
| GET    | /user/rsvp  | Get RSVP history for the user  | ✅            |

### 📅 Event Routes

| Method | Endpoint                     | Description                           | Auth Required  |
| ------ | ---------------------------- | ------------------------------------- | -------------- |
| GET    | /events                      | Get all events                        | ✅             |
| POST   | /events                      | Create a new event                    | ✅             |
| GET    | /events/published            | Get published events                  | ✅             |
| GET    | /events/upcoming             | Get upcoming events                   | ✅             |
| GET    | /events/nearby               | Get nearby events (based on location) | ✅             |
| GET    | /events/category/:categoryId | Get events by category ID             | ✅             |
| GET    | /events/:id                  | Get event by ID                       | ✅             |
| PATCH  | /events/:id                  | Update event (organizer only)         | ✅ (organizer) |
| DELETE | /events/:id                  | Delete event (organizer only)         | ✅ (organizer) |
| GET    | /events/:id/history          | Get version history of the event      | ✅ (organizer) |

### Event Role Routes

| Method | Endpoint                   | Description                    | Auth Required  |
| ------ | -------------------------- | ------------------------------ | -------------- |
| POST   | /events/:eventId/roles     | Assign a role for an event     | ✅ (organizer) |
| GET    | /events/:eventId/roles     | Get roles assigned to an event | ✅             |
| DELETE | /events/:eventId/roles/:id | Remove a role from an event    | ✅             |

### Session Routes

| Method | Endpoint                            | Description               | Auth Required  |
| ------ | ----------------------------------- | ------------------------- | -------------- |
| POST   | /events/:eventId/session            | Add a session to an event | ✅ (organizer) |
| PUT    | /events/:eventId/session/:sessionId | Update a session          | ✅ (organizer) |
| DELETE | /events/:eventId/session/:sessionId | Delete a session          | ✅ (organizer) |

### RSVP Routes

| Method | Endpoint                               | Description                          | Auth Required |
| ------ | -------------------------------------- | ------------------------------------ | ------------- |
| GET    | /events/:eventId/rsvp                  | Get all RSVPs for an event           | ✅            |
| GET    | /events/:eventId/rsvp/user             | Get current user's RSVP for an event | ✅            |
| POST   | /events/:eventId/rsvp                  | Submit RSVP for an event             | ✅            |
| PATCH  | /events/:eventId/rsvp/:rsvpId/check-in | Mark user as checked in              | ✅            |
| PUT    | /events/:eventId/rsvp/:rsvpId/status   | Update RSVP status                   | ✅            |

### Waitlist Routes

| Method | Endpoint                      | Description                            | Auth Required |
| ------ | ----------------------------- | -------------------------------------- | ------------- |
| GET    | /waitlist/user                | Get waitlist entries by current user   | ✅            |
| GET    | /waitlist/event/:eventId      | Get waitlist for a specific event      | ✅            |
| GET    | /waitlist/event/:eventId/user | Check if user is on waitlist for event | ✅            |

### Notification Routes

| Method | Endpoint            | Description              | Auth Required |
| ------ | ------------------- | ------------------------ | ------------- |
| POST   | /notifications      | Create a notification    | ✅            |
| GET    | /notifications/user | Get user's notifications | ✅            |

### Feedback Routes

| Method | Endpoint                 | Description                        | Auth Required |
| ------ | ------------------------ | ---------------------------------- | ------------- |
| POST   | /feedback                | Submit feedback                    | ✅            |
| GET    | /feedback/event/:eventId | Get feedback for a specific event  | ✅            |
| GET    | /feedback/user           | Get feedback submitted by the user | ✅            |
| PUT    | /feedback/:id            | Update feedback                    | ✅            |
| POST   | /feedback/:id/helpful    | Mark feedback as helpful           | ✅            |

### Category Routes

| Method | Endpoint        | Description           | Auth Required |
| ------ | --------------- | --------------------- | ------------- |
| GET    | /categories     | Get all categories    | ✅            |
| POST   | /categories     | Create a new category | ✅            |
| PATCH  | /categories/:id | Update a category     | ✅            |
| DELETE | /categories/:id | Delete a category     | ✅            |

## MongoDB Design Highlights

| MongoDB Feature  | Used In                          |
| ---------------- | -------------------------------- |
| Refs (populate)  | Users, Events, Roles, RSVP       |
| Subdocuments     | Sessions inside Events           |
| Virtuals         | Event duration, session count    |
| Compound Indexes | RSVP/Waitlist uniqueness         |
| TTL Index        | Refresh Tokens, Notifications    |
| Validation       | Feedback, User, RSVP             |
| Pre/Post Hooks   | Password hashing, logging        |
| Plugins          | Audit logging                    |
| Aggregation      | Event average ratings (optional) |

## Core Models Overview

| Model         | Description                                |
| ------------- | ------------------------------------------ |
| User          | User info + role ref                       |
| Role          | Role names for RBAC                        |
| Event         | Event info, creator ref, embedded sessions |
| SessionSchema | Subdocument inside Event.sessions[]        |
| RSVP          | RSVP by user for event                     |
| Waitlist      | Waitlisted users (if event full)           |
| Feedback      | Ratings & comments on events               |
| Notification  | User notifications (read + TTL optional)   |
| RefreshToken  | Session management via refresh tokens      |
| AuditLog      | Logs of user/admin actions                 |
| Category      | Event categories with unique name          |

## Security Enhancements

- helmet to set HTTP headers securely
- express-rate-limit to prevent brute-force attacks
- CORS policy with whitelist
- Optional: express-mongo-sanitize to prevent NoSQL injection

## 🛠 Getting Started

```bash
# Clone the repository
git clone https://github.com/Sunanda-05/event-schedule-mongodb

# Navigate into the project
cd event-schedule-mongodb

# Install dependencies
npm install

# Create a .env file from example
cp .env.example .env

# Start the development server
npm run dev
```

## 📌 Future Enhancements

- Add input validation with zod or joi
- Admin dashboard for analytics (event popularity, feedback stats)
- Email notifications (RSVP confirmations)
- Frontend integration (React / Next.js)
- OAuth login (Google, GitHub)

## License

This project is licensed under the ISC License

© 2025 Event Management API – Developed by Sunanda Manna
