export const userPaths = {
  "/api/user": {
    get: {
      tags: ["Users"],
      summary: "Get current user profile",
      operationId: "getUserProfile",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "User profile",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
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
  },

  "/api/user/roles": {
    get: {
      tags: ["Users"],
      summary: "Get current user event roles",
      operationId: "getRolesByUser",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Roles associated with the current user",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/EventRole",
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

  "/api/user/rsvp": {
    get: {
      tags: ["Users"],
      summary: "Get current user RSVP records",
      operationId: "getUserRsvps",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "RSVP records for current user",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/RSVP",
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
};
