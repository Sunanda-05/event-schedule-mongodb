export const schemas = {
  ObjectId: {
    type: "string",
    pattern: "^[a-fA-F0-9]{24}$",
    example: "65f94e5532b6cbb6f5dbe012",
  },

  ErrorResponse: {
    type: "object",
    required: ["error"],
    properties: {
      error: {
        type: "string",
        example: "Internal Server Error",
      },
    },
  },

  UserLocation: {
    type: "object",
    required: ["coordinates"],
    properties: {
      type: {
        type: "string",
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: "array",
        minItems: 2,
        maxItems: 2,
        items: {
          type: "number",
        },
        description: "[longitude, latitude]",
        example: [77.5946, 12.9716],
      },
    },
  },

  UserPreferences: {
    type: "object",
    properties: {
      notificationSettings: {
        type: "object",
        additionalProperties: true,
      },
      categories: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },
    },
  },

  User: {
    type: "object",
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      name: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      globalRole: {
        type: "string",
        enum: ["admin", "user"],
      },
      location: {
        $ref: "#/components/schemas/UserLocation",
      },
      preferences: {
        $ref: "#/components/schemas/UserPreferences",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  Category: {
    type: "object",
    required: ["name"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      iconUrl: {
        type: "string",
        format: "uri",
      },
      parentCategory: {
        $ref: "#/components/schemas/ObjectId",
      },
      popularity: {
        type: "number",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  EventDateRange: {
    type: "object",
    required: ["start", "end"],
    properties: {
      start: {
        type: "string",
        format: "date-time",
      },
      end: {
        type: "string",
        format: "date-time",
      },
    },
  },

  EventLocation: {
    type: "object",
    properties: {
      address: {
        type: "string",
      },
      coordinates: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["Point"],
            default: "Point",
          },
          coordinates: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "number",
            },
            description: "[longitude, latitude]",
          },
        },
      },
      virtualLink: {
        type: "string",
        format: "uri",
      },
    },
  },

  EventPrice: {
    type: "object",
    properties: {
      amount: {
        type: "number",
      },
      currency: {
        type: "string",
        example: "USD",
      },
    },
  },

  SessionSpeaker: {
    type: "object",
    properties: {
      userId: {
        $ref: "#/components/schemas/ObjectId",
      },
      name: {
        type: "string",
      },
      bio: {
        type: "string",
      },
      imageUrl: {
        type: "string",
        format: "uri",
      },
    },
  },

  SessionMaterial: {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      type: {
        type: "string",
        enum: ["pdf", "video", "link"],
      },
      url: {
        type: "string",
        format: "uri",
      },
    },
  },

  Session: {
    type: "object",
    required: ["name", "startTime", "endTime"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      name: {
        type: "string",
      },
      startTime: {
        type: "string",
        format: "date-time",
      },
      endTime: {
        type: "string",
        format: "date-time",
      },
      description: {
        type: "string",
      },
      location: {
        type: "string",
      },
      speakers: {
        type: "array",
        items: {
          $ref: "#/components/schemas/SessionSpeaker",
        },
      },
      materials: {
        type: "array",
        items: {
          $ref: "#/components/schemas/SessionMaterial",
        },
      },
    },
  },

  EventVersionItem: {
    type: "object",
    properties: {
      version: {
        type: "number",
      },
      updatedBy: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/User" },
        ],
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
      changes: {
        type: "object",
        additionalProperties: true,
      },
    },
  },

  Event: {
    type: "object",
    required: ["title", "date"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
      shortDescription: {
        type: "string",
      },
      date: {
        $ref: "#/components/schemas/EventDateRange",
      },
      location: {
        $ref: "#/components/schemas/EventLocation",
      },
      capacity: {
        type: "number",
      },
      price: {
        $ref: "#/components/schemas/EventPrice",
      },
      categories: {
        type: "array",
        items: {
          oneOf: [
            { $ref: "#/components/schemas/ObjectId" },
            { $ref: "#/components/schemas/Category" },
          ],
        },
      },
      createdBy: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/User" },
        ],
      },
      status: {
        type: "string",
        enum: ["draft", "published", "cancelled", "completed"],
      },
      version: {
        type: "number",
      },
      versionHistory: {
        type: "array",
        items: {
          $ref: "#/components/schemas/EventVersionItem",
        },
      },
      images: {
        type: "array",
        items: {
          type: "string",
          format: "uri",
        },
      },
      featuredImage: {
        type: "string",
        format: "uri",
      },
      attendees: {
        type: "number",
      },
      avgRating: {
        type: "number",
      },
      sessions: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Session",
        },
      },
      latestUpdatedBy: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/User" },
          { type: "null" },
        ],
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  EventListResponse: {
    type: "object",
    properties: {
      total: {
        type: "number",
      },
      page: {
        type: "number",
      },
      pageSize: {
        type: "number",
      },
      events: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Event",
        },
      },
    },
  },

  EventRole: {
    type: "object",
    required: ["eventId", "userId", "role"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      eventId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/Event" },
        ],
      },
      userId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/User" },
        ],
      },
      role: {
        type: "string",
        enum: ["organizer", "participant", "speaker", "volunteer"],
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  RSVP: {
    type: "object",
    required: ["eventId", "userId", "status"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      eventId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          {
            type: "object",
            properties: {
              _id: { $ref: "#/components/schemas/ObjectId" },
              title: { type: "string" },
              shortDescription: { type: "string" },
            },
          },
        ],
      },
      userId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          {
            type: "object",
            properties: {
              _id: { $ref: "#/components/schemas/ObjectId" },
              name: { type: "string" },
              email: { type: "string", format: "email" },
            },
          },
        ],
      },
      status: {
        type: "string",
        enum: ["attending", "not attending", "maybe"],
      },
      checkInTime: {
        type: "string",
        format: "date-time",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  Waitlist: {
    type: "object",
    required: ["eventId", "userId", "position"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      eventId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          {
            type: "object",
            properties: {
              _id: { $ref: "#/components/schemas/ObjectId" },
              title: { type: "string" },
              shortDescription: { type: "string" },
            },
          },
        ],
      },
      userId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          {
            type: "object",
            properties: {
              _id: { $ref: "#/components/schemas/ObjectId" },
              name: { type: "string" },
              email: { type: "string", format: "email" },
            },
          },
        ],
      },
      position: {
        type: "number",
      },
      status: {
        type: "string",
        enum: ["waiting", "offered", "accepted", "declined"],
      },
      notificationSent: {
        type: "string",
        format: "date-time",
      },
      responseDeadline: {
        type: "string",
        format: "date-time",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  FeedbackHelpful: {
    type: "object",
    properties: {
      count: {
        type: "number",
      },
      users: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },
    },
  },

  Feedback: {
    type: "object",
    required: ["eventId", "userId", "rating"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      eventId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/Event" },
        ],
      },
      userId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          {
            type: "object",
            properties: {
              _id: { $ref: "#/components/schemas/ObjectId" },
              name: { type: "string" },
              email: { type: "string", format: "email" },
            },
          },
        ],
      },
      rating: {
        type: "number",
        minimum: 1,
        maximum: 5,
      },
      comment: {
        type: "string",
      },
      anonymous: {
        type: "boolean",
      },
      helpful: {
        $ref: "#/components/schemas/FeedbackHelpful",
      },
      status: {
        type: "string",
        enum: ["published", "pending", "flagged"],
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  NotificationAction: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["link", "button"],
      },
      text: {
        type: "string",
      },
      url: {
        type: "string",
        format: "uri",
      },
    },
  },

  Notification: {
    type: "object",
    required: ["userId", "entityType", "entityId", "title", "message", "type"],
    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },
      userId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/User" },
        ],
      },
      entityType: {
        type: "string",
        enum: ["event", "rsvp", "waitlist"],
      },
      entityId: {
        oneOf: [
          { $ref: "#/components/schemas/ObjectId" },
          { $ref: "#/components/schemas/Event" },
          { $ref: "#/components/schemas/RSVP" },
          { $ref: "#/components/schemas/Waitlist" },
        ],
      },
      title: {
        type: "string",
      },
      message: {
        type: "string",
      },
      type: {
        type: "string",
        enum: ["reminder", "update", "cancellation"],
      },
      status: {
        type: "string",
        enum: ["unread", "read"],
      },
      action: {
        $ref: "#/components/schemas/NotificationAction",
      },
      expireAt: {
        type: "string",
        format: "date-time",
      },
      readAt: {
        type: "string",
        format: "date-time",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  RegisterUserRequest: {
    type: "object",
    required: ["email", "password", "location"],
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        minLength: 6,
      },
      location: {
        $ref: "#/components/schemas/UserLocation",
      },
      preferences: {
        $ref: "#/components/schemas/UserPreferences",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
    },
  },

  LoginResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Login successful!",
      },
      email: {
        type: "string",
        format: "email",
      },
      accessToken: {
        type: "string",
      },
    },
  },

  RefreshTokenResponse: {
    type: "object",
    properties: {
      accessToken: {
        type: "string",
      },
    },
  },

  LogoutResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Logged out successfully",
      },
    },
  },

  CategoryCreateRequest: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      iconUrl: {
        type: "string",
        format: "uri",
      },
      parentCategory: {
        $ref: "#/components/schemas/ObjectId",
      },
      popularity: {
        type: "number",
      },
    },
  },

  CategoryUpdateRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      iconUrl: {
        type: "string",
        format: "uri",
      },
      parentCategory: {
        $ref: "#/components/schemas/ObjectId",
      },
      popularity: {
        type: "number",
      },
    },
  },

  EventCreateRequest: {
    type: "object",
    required: ["title", "date"],
    properties: {
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
      shortDescription: {
        type: "string",
      },
      date: {
        $ref: "#/components/schemas/EventDateRange",
      },
      location: {
        $ref: "#/components/schemas/EventLocation",
      },
      capacity: {
        type: "number",
      },
      price: {
        $ref: "#/components/schemas/EventPrice",
      },
      categories: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },
      status: {
        type: "string",
        enum: ["draft", "published", "cancelled", "completed"],
      },
      images: {
        type: "array",
        items: {
          type: "string",
          format: "uri",
        },
      },
      featuredImage: {
        type: "string",
        format: "uri",
      },
      sessions: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Session",
        },
      },
    },
  },

  EventUpdateRequest: {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
      shortDescription: {
        type: "string",
      },
      date: {
        $ref: "#/components/schemas/EventDateRange",
      },
      location: {
        $ref: "#/components/schemas/EventLocation",
      },
      capacity: {
        type: "number",
      },
      price: {
        $ref: "#/components/schemas/EventPrice",
      },
      categories: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },
      status: {
        type: "string",
        enum: ["draft", "published", "cancelled", "completed"],
      },
      images: {
        type: "array",
        items: {
          type: "string",
          format: "uri",
        },
      },
      featuredImage: {
        type: "string",
        format: "uri",
      },
    },
  },

  EventRoleCreateRequest: {
    type: "object",
    required: ["role"],
    properties: {
      userId: {
        $ref: "#/components/schemas/ObjectId",
      },
      role: {
        type: "string",
        enum: ["organizer", "participant", "speaker", "volunteer"],
      },
    },
  },

  RSVPCheckInRequest: {
    type: "object",
    required: ["checkInTime"],
    properties: {
      checkInTime: {
        type: "string",
        format: "date-time",
      },
    },
  },

  RSVPMutationResponse: {
    type: "object",
    properties: {
      data: {
        oneOf: [
          { $ref: "#/components/schemas/RSVP" },
          { $ref: "#/components/schemas/Waitlist" },
        ],
      },
      msg: {
        type: "string",
        example: "RSVP Created",
      },
    },
  },

  FeedbackCreateRequest: {
    type: "object",
    required: ["eventId", "rating"],
    properties: {
      eventId: {
        $ref: "#/components/schemas/ObjectId",
      },
      rating: {
        type: "number",
        minimum: 1,
        maximum: 5,
      },
      comment: {
        type: "string",
      },
      anonymous: {
        type: "boolean",
      },
      status: {
        type: "string",
        enum: ["published", "pending", "flagged"],
      },
    },
  },

  FeedbackUpdateRequest: {
    type: "object",
    properties: {
      rating: {
        type: "number",
        minimum: 1,
        maximum: 5,
      },
      comment: {
        type: "string",
      },
      anonymous: {
        type: "boolean",
      },
      status: {
        type: "string",
        enum: ["published", "pending", "flagged"],
      },
    },
  },

  NotificationCreateRequest: {
    type: "object",
    required: ["entityType", "entityId", "title", "message", "type"],
    properties: {
      entityType: {
        type: "string",
        enum: ["event", "rsvp", "waitlist"],
      },
      entityId: {
        $ref: "#/components/schemas/ObjectId",
      },
      title: {
        type: "string",
      },
      message: {
        type: "string",
      },
      type: {
        type: "string",
        enum: ["reminder", "update", "cancellation"],
      },
      action: {
        $ref: "#/components/schemas/NotificationAction",
      },
      expireAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  SessionCreateRequest: {
    type: "object",
    required: ["name", "startTime", "endTime"],
    properties: {
      name: {
        type: "string",
      },
      startTime: {
        type: "string",
        format: "date-time",
      },
      endTime: {
        type: "string",
        format: "date-time",
      },
      description: {
        type: "string",
      },
      location: {
        type: "string",
      },
      speakers: {
        type: "array",
        items: {
          $ref: "#/components/schemas/SessionSpeaker",
        },
      },
      materials: {
        type: "array",
        items: {
          $ref: "#/components/schemas/SessionMaterial",
        },
      },
    },
  },

  SessionUpdateRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      startTime: {
        type: "string",
        format: "date-time",
      },
      endTime: {
        type: "string",
        format: "date-time",
      },
      description: {
        type: "string",
      },
      location: {
        type: "string",
      },
      speakers: {
        type: "array",
        items: {
          $ref: "#/components/schemas/SessionSpeaker",
        },
      },
      materials: {
        type: "array",
        items: {
          $ref: "#/components/schemas/SessionMaterial",
        },
      },
    },
  },
};
