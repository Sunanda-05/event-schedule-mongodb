export const waitlistPaths = {
  "/api/waitlist/user": {
    get: {
      tags: ["Waitlist"],
      summary: "Get waitlist entries for current user",
      operationId: "getWaitlistByUser",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Waitlist entries for current user",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Waitlist",
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

  "/api/waitlist/event/{eventId}": {
    get: {
      tags: ["Waitlist"],
      summary: "Get waitlist entries by event",
      operationId: "getWaitlistByEvent",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      responses: {
        "200": {
          description: "Waitlist entries for event",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Waitlist",
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

  "/api/waitlist/event/{eventId}/user": {
    get: {
      tags: ["Waitlist"],
      summary: "Get current user's waitlist entry for an event",
      operationId: "getWaitlistByUserEvent",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      responses: {
        "200": {
          description: "Current user's waitlist entry for event",
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  {
                    $ref: "#/components/schemas/Waitlist",
                  },
                  {
                    type: "null",
                  },
                ],
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
};
