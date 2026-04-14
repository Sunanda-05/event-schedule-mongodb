export const categoryPaths = {
  "/api/category": {
    get: {
      tags: ["Categories"],
      summary: "List categories",
      operationId: "getCategories",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Category list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Category",
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
    post: {
      tags: ["Categories"],
      summary: "Create category",
      description: "Admin-only category creation endpoint.",
      operationId: "createCategory",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CategoryCreateRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Category created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Category",
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

  "/api/category/{id}": {
    patch: {
      tags: ["Categories"],
      summary: "Update category",
      description: "Admin-only category update endpoint.",
      operationId: "updateCategory",
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
              $ref: "#/components/schemas/CategoryUpdateRequest",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Category updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Category",
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
    delete: {
      tags: ["Categories"],
      summary: "Delete category",
      description: "Admin-only category delete endpoint.",
      operationId: "deleteCategory",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          $ref: "#/components/parameters/IdParam",
        },
      ],
      responses: {
        "200": {
          description: "Category deleted",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Category",
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
