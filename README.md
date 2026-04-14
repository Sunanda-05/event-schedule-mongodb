# MongooseMeet - Event Management Platform API

> Scalable, Role-Based Event Management API built with MongoDB, Express, and Mongoose

A modern backend system for organizing, managing, and attending events. It handles authentication, role-based access, session scheduling, RSVP/waitlist handling, feedback, notifications, and logging — all while leveraging MongoDB's document strengths like subdocuments, virtuals, TTL indexes, and compound indexes.

## Key Features

### Authentication & Security

| Feature             | Implementation                                    |
| ------------------- | ------------------------------------------------- |
| JWT Auth            | Access + Refresh Tokens (securely stored/rotated) |
| Role-Based Access   | RBAC via auth + authorizeRole middleware           |
| Token Storage       | Refresh tokens stored in a separate collection    |
| Password Hashing    | bcryptjs during auth/register flow                |
| Security Middleware | Helmet, Rate-limiting, CORS                       |

### User & Role Management

- Register/Login with JWT-based sessions
- Global user role plus per-event roles via EventRole model
- Profile update with role population
- Admin-only checks on protected category management flows

### Event & Session Management

- Events created by users (with createdBy ref)
- Each event has embedded sessions with title, speaker, timing, etc.
- Subdocuments used for sessions (inside Event model)
- Virtuals like durationMinutes and durationHours for analytics

### RSVP & Waitlist

- RSVP statuses: attending, maybe, not attending
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

## API Authentication

All protected endpoints require a valid access token in the Authorization header:

```
Authorization: Bearer <accessToken>
```

Refresh tokens are stored securely and rotated for extended sessions.

## Swagger Documentation

- Swagger UI: http://localhost:5001/api-docs
- OpenAPI JSON: http://localhost:5001/api-docs.json

### Swagger Image Placeholders

| Image 1 | Image 2 |
| --- | --- |
| [![Swagger Image 1](/images/image0.png)](/images/image0.png) | [![Swagger Image 2](/images/image1.png)](/images/image1.png) |
| [![Swagger Image 3](/images/image2.png)](/images/image2.png) | [![Swagger Image 4](/images/image3.png)](/images/image3.png) |
| [![Swagger Image 5](/images/image4.png)](/images/image4.png) | [![Swagger Image 6](/images/image5.png)](/images/image5.png) |

## API Routes

### Auth Routes

| Method | Endpoint       | Description          | Auth Required |
| ------ | -------------- | -------------------- | ------------- |
| POST   | /api/auth/register | Register new user    | No            |
| POST   | /api/auth/login    | Login and issue tokens | No          |
| POST   | /api/auth/refresh-token  | Rotate access token  | Refresh cookie |
| POST   | /api/auth/logout   | Revoke session       | Refresh cookie |

### User Routes

| Method | Endpoint    | Description                    | Auth Required |
| ------ | ----------- | ------------------------------ | ------------- |
| GET    | /api/user       | Get current user profile       | Yes          |
| GET    | /api/user/roles | Get roles associated with user | Yes          |
| GET    | /api/user/rsvp  | Get RSVP history for the user  | Yes          |

### Event Routes

| Method | Endpoint                     | Description                           | Auth Required  |
| ------ | ---------------------------- | ------------------------------------- | -------------- |
| GET    | /api/event                      | Get all events                        | Yes            |
| POST   | /api/event                      | Create a new event                    | Yes            |
| GET    | /api/event/published            | Get published events                  | Yes            |
| GET    | /api/event/upcoming             | Get upcoming events                   | Yes            |
| GET    | /api/event/nearby               | Get nearby events (based on location) | Yes            |
| GET    | /api/event/category/:categoryId | Get events by category ID             | Yes            |
| GET    | /api/event/:id                  | Get event by ID                       | Yes            |
| PATCH  | /api/event/:id                  | Update event (organizer only)         | Yes (organizer) |
| DELETE | /api/event/:id                  | Delete event (organizer only)         | Yes (organizer) |
| GET    | /api/event/:id/history          | Get version history of the event      | Yes (organizer) |

### Event Role Routes

| Method | Endpoint                   | Description                    | Auth Required  |
| ------ | -------------------------- | ------------------------------ | -------------- |
| POST   | /api/event/:eventId/roles     | Assign a role for an event     | Yes (organizer) |
| GET    | /api/event/:eventId/roles     | Get roles assigned to an event | Yes            |
| DELETE | /api/event/:eventId/roles/:id | Remove a role from an event    | Yes            |

### Session Routes

| Method | Endpoint                            | Description               | Auth Required  |
| ------ | ----------------------------------- | ------------------------- | -------------- |
| POST   | /api/event/:eventId/session            | Add a session to an event | Yes (organizer) |
| PUT    | /api/event/:eventId/session/:sessionId | Update a session          | Yes (organizer) |
| DELETE | /api/event/:eventId/session/:sessionId | Delete a session          | Yes (organizer) |

### RSVP Routes

| Method | Endpoint                               | Description                          | Auth Required |
| ------ | -------------------------------------- | ------------------------------------ | ------------- |
| GET    | /api/event/:eventId/rsvp                  | Get all RSVPs for an event           | Yes           |
| GET    | /api/event/:eventId/rsvp/user             | Get current user's RSVP for an event | Yes           |
| POST   | /api/event/:eventId/rsvp                  | Submit RSVP for an event             | Yes           |
| PATCH  | /api/event/:eventId/rsvp/:rsvpId/check-in | Mark user as checked in              | Yes           |
| PUT    | /api/event/:eventId/rsvp/:rsvpId/status   | Update RSVP status                   | Yes           |

### Waitlist Routes

| Method | Endpoint                      | Description                            | Auth Required |
| ------ | ----------------------------- | -------------------------------------- | ------------- |
| GET    | /api/waitlist/user                | Get waitlist entries by current user   | Yes           |
| GET    | /api/waitlist/event/:eventId      | Get waitlist for a specific event      | Yes           |
| GET    | /api/waitlist/event/:eventId/user | Check if user is on waitlist for event | Yes           |

### Notification Routes

| Method | Endpoint            | Description              | Auth Required |
| ------ | ------------------- | ------------------------ | ------------- |
| POST   | /api/notification      | Create a notification    | Yes           |
| GET    | /api/notification/user | Get user's notifications | Yes           |

### Feedback Routes

| Method | Endpoint                 | Description                        | Auth Required |
| ------ | ------------------------ | ---------------------------------- | ------------- |
| POST   | /api/feedback                | Submit feedback                    | Yes           |
| GET    | /api/feedback/event/:eventId | Get feedback for a specific event  | Yes           |
| GET    | /api/feedback/user           | Get feedback submitted by the user | Yes           |
| PUT    | /api/feedback/:id            | Update feedback                    | Yes           |
| POST   | /api/feedback/:id/helpful    | Mark feedback as helpful           | Yes           |

### Category Routes

| Method | Endpoint        | Description           | Auth Required |
| ------ | --------------- | --------------------- | ------------- |
| GET    | /api/category     | Get all categories    | Yes           |
| POST   | /api/category     | Create a new category | Yes           |
| PATCH  | /api/category/:id | Update a category     | Yes           |
| DELETE | /api/category/:id | Delete a category     | Yes           |

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
| EventRole     | Role assignments by user and event         |
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

## Getting Started

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

## Future Enhancements

- Add input validation with zod or joi
- Admin dashboard for analytics (event popularity, feedback stats)
- Email notifications (RSVP confirmations)
- Frontend integration (React / Next.js)
- OAuth login (Google, GitHub)

## License

This project is licensed under the ISC License

© 2025 Event Management API – Developed by Sunanda Manna
