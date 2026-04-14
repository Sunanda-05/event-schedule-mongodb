export const notificationPaths = {
  "/api/notification": {
    post: {
      tags: ["Notifications"],
      summary: "Create notification",
      operationId: "createNotification",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotificationCreateRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Notification created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Notification",
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

  "/api/notification/user": {
    get: {
      tags: ["Notifications"],
      summary: "Get current user notifications",
      operationId: "getUserNotifications",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Notification list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Notification",
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
