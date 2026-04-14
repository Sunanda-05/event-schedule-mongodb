export const sessionPaths = {
  "/api/event/{eventId}/session": {
    post: {
      tags: ["Sessions"],
      summary: "Create session in event",
      description: "Requires organizer role for the event.",
      operationId: "createSession",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SessionCreateRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Session created and embedded in event",
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

  "/api/event/{eventId}/session/{sessionId}": {
    put: {
      tags: ["Sessions"],
      summary: "Update session in event",
      description: "Requires organizer role for the event.",
      operationId: "updateSession",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
        {
          $ref: "#/components/parameters/SessionIdParam",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SessionUpdateRequest",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Session updated",
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
      tags: ["Sessions"],
      summary: "Delete session from event",
      description: "Requires organizer role for the event.",
      operationId: "deleteSession",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
        {
          $ref: "#/components/parameters/SessionIdParam",
        },
      ],
      responses: {
        "200": {
          description: "Session deleted",
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
};
