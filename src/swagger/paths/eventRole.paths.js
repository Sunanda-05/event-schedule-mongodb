export const eventRolePaths = {
  "/api/event/{eventId}/roles": {
    post: {
      tags: ["Event Roles"],
      summary: "Assign role in event",
      description: "Requires organizer role for the event.",
      operationId: "createEventRole",
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
              $ref: "#/components/schemas/EventRoleCreateRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Event role created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EventRole",
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
        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
    get: {
      tags: ["Event Roles"],
      summary: "List roles for event",
      operationId: "getRolesByEvent",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      responses: {
        "200": {
          description: "Roles for event",
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

  "/api/event/{eventId}/roles/{id}": {
    delete: {
      tags: ["Event Roles"],
      summary: "Delete role assignment",
      operationId: "deleteEventRole",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
        {
          $ref: "#/components/parameters/IdParam",
        },
      ],
      responses: {
        "200": {
          description: "Role assignment deleted",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EventRole",
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
  },
};
