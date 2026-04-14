export const eventPaths = {
  "/api/event": {
    get: {
      tags: ["Events"],
      summary: "List events",
      description:
        "Returns paginated event results. Supports search and optional implementation-specific filter/sort query strings.",
      operationId: "getAllEvents",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/PageParam",
        },
        {
          $ref: "#/components/parameters/LimitParam",
        },
        {
          $ref: "#/components/parameters/SearchParam",
        },
        {
          $ref: "#/components/parameters/SortParam",
        },
        {
          $ref: "#/components/parameters/FilterParam",
        },
      ],
      responses: {
        "200": {
          description: "Paginated event list",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EventListResponse",
              },
            },
          },
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    post: {
      tags: ["Events"],
      summary: "Create event",
      operationId: "createEvent",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EventCreateRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Event created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Event",
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/event/published": {
    get: {
      tags: ["Events"],
      summary: "List published events",
      operationId: "getPublishedEvents",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Published events",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Event",
                },
              },
            },
          },
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/event/upcoming": {
    get: {
      tags: ["Events"],
      summary: "List upcoming events for current user",
      operationId: "getUpcomingEvents",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Upcoming events",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Event",
                },
              },
            },
          },
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/event/nearby": {
    get: {
      tags: ["Events"],
      summary: "List nearby events",
      operationId: "getNearbyEvents",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/LongitudeParam",
        },
        {
          $ref: "#/components/parameters/LatitudeParam",
        },
        {
          $ref: "#/components/parameters/RadiusParam",
        },
      ],
      responses: {
        "200": {
          description: "Nearby published events",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Event",
                },
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/event/category/{categoryId}": {
    get: {
      tags: ["Events"],
      summary: "List events by category",
      operationId: "getEventsByCategory",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/CategoryIdParam",
        },
      ],
      responses: {
        "200": {
          description: "Published events in selected category",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Event",
                },
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/event/{id}": {
    get: {
      tags: ["Events"],
      summary: "Get event by id",
      operationId: "getEventById",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/IdParam",
        },
      ],
      responses: {
        "200": {
          description: "Event details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Event",
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "404": {
          $ref: "#/components/responses/NotFound",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    patch: {
      tags: ["Events"],
      summary: "Update event",
      description: "Requires organizer role for the event.",
      operationId: "updateEvent",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/IdParam",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EventUpdateRequest",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Event updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Event",
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "403": {
          $ref: "#/components/responses/Forbidden",
        },
        "404": {
          $ref: "#/components/responses/NotFound",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    delete: {
      tags: ["Events"],
      summary: "Delete event",
      description: "Requires organizer role for the event.",
      operationId: "deleteEvent",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/IdParam",
        },
      ],
      responses: {
        "200": {
          description: "Event deleted",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Event",
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "403": {
          $ref: "#/components/responses/Forbidden",
        },
        "404": {
          $ref: "#/components/responses/NotFound",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/event/{id}/history": {
    get: {
      tags: ["Events"],
      summary: "Get event version history",
      description: "Requires organizer role for the event.",
      operationId: "getEventVersionHistory",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/IdParam",
        },
      ],
      responses: {
        "200": {
          description: "Event version history",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/EventVersionItem",
                },
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "403": {
          $ref: "#/components/responses/Forbidden",
        },
        "404": {
          $ref: "#/components/responses/NotFound",
        },
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};
