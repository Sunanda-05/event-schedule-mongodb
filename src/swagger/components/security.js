export const securitySchemes = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "JWT access token in Authorization header as Bearer <token>",
  },
  refreshTokenCookie: {
    type: "apiKey",
    in: "cookie",
    name: "refreshToken",
    description: "Refresh token cookie issued by /api/auth/login",
  },
};
