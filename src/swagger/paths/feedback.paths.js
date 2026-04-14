export const feedbackPaths = {
  "/api/feedback": {
    post: {
      tags: ["Feedback"],
      summary: "Create feedback",
      operationId: "createFeedback",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FeedbackCreateRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Feedback created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Feedback",
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

  "/api/feedback/event/{eventId}": {
    get: {
      tags: ["Feedback"],
      summary: "Get feedback for event",
      operationId: "getEventFeedback",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      responses: {
        "200": {
          description: "Feedback list for event",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Feedback",
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

  "/api/feedback/user": {
    get: {
      tags: ["Feedback"],
      summary: "Get current user feedback",
      operationId: "getUserFeedback",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Feedback list for current user",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Feedback",
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

  "/api/feedback/{id}": {
    put: {
      tags: ["Feedback"],
      summary: "Update feedback",
      operationId: "updateFeedback",
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
              $ref: "#/components/schemas/FeedbackUpdateRequest",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Feedback updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Feedback",
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

  "/api/feedback/{id}/helpful": {
    post: {
      tags: ["Feedback"],
      summary: "Toggle helpful mark on feedback",
      operationId: "markFeedbackHelpful",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/IdParam",
        },
      ],
      responses: {
        "200": {
          description: "Feedback helpful state updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Feedback",
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
};
