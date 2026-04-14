const errorJson = {
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
    },
  },
};

export const responses = {
  BadRequest: {
    description: "Bad request",
    ...errorJson,
  },
  Unauthorized: {
    description: "Unauthorized",
    ...errorJson,
  },
  Forbidden: {
    description: "Forbidden",
    ...errorJson,
  },
  NotFound: {
    description: "Resource not found",
    ...errorJson,
  },
  InternalServerError: {
    description: "Internal server error",
    ...errorJson,
  },
};
