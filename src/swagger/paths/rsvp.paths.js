export const rsvpPaths = {
  "/api/event/{eventId}/rsvp": {
    get: {
      tags: ["RSVP"],
      summary: "List RSVPs for an event",
      operationId: "getRsvpByEvent",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      responses: {
        "200": {
          description: "RSVP records for event",
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
    post: {
      tags: ["RSVP"],
      summary: "Create RSVP for current user",
      description:
        "Creates attending RSVP when capacity exists, otherwise creates a waitlist entry.",
      operationId: "createRsvp",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      responses: {
        "200": {
          description: "RSVP or waitlist created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RSVPMutationResponse",
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

  "/api/event/{eventId}/rsvp/user": {
    get: {
      tags: ["RSVP"],
      summary: "Get current user's RSVP for event",
      operationId: "getRsvpByUserEvent",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
      ],
      responses: {
        "200": {
          description: "Current user's RSVP for event",
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  {
                    $ref: "#/components/schemas/RSVP",
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

  "/api/event/{eventId}/rsvp/{rsvpId}/check-in": {
    patch: {
      tags: ["RSVP"],
      summary: "Update RSVP check-in time",
      operationId: "updateRsvpCheckIn",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
        {
          $ref: "#/components/parameters/RSVPIdParam",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RSVPCheckInRequest",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "RSVP check-in updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RSVP",
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

  "/api/event/{eventId}/rsvp/{rsvpId}/status": {
    put: {
      tags: ["RSVP"],
      summary: "Enable or disable RSVP",
      operationId: "updateRsvpStatus",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/EventIdParam",
        },
        {
          $ref: "#/components/parameters/RSVPIdParam",
        },
        {
          $ref: "#/components/parameters/RSVPStatusActionParam",
        },
      ],
      responses: {
        "200": {
          description: "RSVP status updated",
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  {
                    $ref: "#/components/schemas/RSVPMutationResponse",
                  },
                  {
                    $ref: "#/components/schemas/RSVP",
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
