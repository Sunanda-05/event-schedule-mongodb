export const parameters = {
  IdParam: {
    name: "id",
    in: "path",
    required: true,
    schema: {
      $ref: "#/components/schemas/ObjectId",
    },
    description: "Resource identifier",
  },
  EventIdParam: {
    name: "eventId",
    in: "path",
    required: true,
    schema: {
      $ref: "#/components/schemas/ObjectId",
    },
    description: "Event identifier",
  },
  CategoryIdParam: {
    name: "categoryId",
    in: "path",
    required: true,
    schema: {
      $ref: "#/components/schemas/ObjectId",
    },
    description: "Category identifier",
  },
  RSVPIdParam: {
    name: "rsvpId",
    in: "path",
    required: true,
    schema: {
      $ref: "#/components/schemas/ObjectId",
    },
    description: "RSVP identifier",
  },
  SessionIdParam: {
    name: "sessionId",
    in: "path",
    required: true,
    schema: {
      $ref: "#/components/schemas/ObjectId",
    },
    description: "Session identifier",
  },
  PageParam: {
    name: "page",
    in: "query",
    required: false,
    schema: {
      type: "integer",
      minimum: 1,
      default: 1,
    },
    description: "Page number for paginated event listing",
  },
  LimitParam: {
    name: "limit",
    in: "query",
    required: false,
    schema: {
      type: "integer",
      minimum: 1,
      maximum: 100,
      default: 10,
    },
    description: "Number of records to return",
  },
  SearchParam: {
    name: "search",
    in: "query",
    required: false,
    schema: {
      type: "string",
    },
    description: "Text search term for event title/description",
  },
  SortParam: {
    name: "sort",
    in: "query",
    required: false,
    schema: {
      type: "string",
      example: '{"date.start":1}',
    },
    description:
      "Optional JSON-like sort object encoded as a string (implementation-specific)",
  },
  FilterParam: {
    name: "filter",
    in: "query",
    required: false,
    schema: {
      type: "string",
      example: '{"status":"published"}',
    },
    description:
      "Optional JSON-like filter object encoded as a string (implementation-specific)",
  },
  LongitudeParam: {
    name: "lng",
    in: "query",
    required: true,
    schema: {
      type: "number",
      example: 77.5946,
    },
    description: "Longitude for nearby event search",
  },
  LatitudeParam: {
    name: "lat",
    in: "query",
    required: true,
    schema: {
      type: "number",
      example: 12.9716,
    },
    description: "Latitude for nearby event search",
  },
  RadiusParam: {
    name: "radius",
    in: "query",
    required: false,
    schema: {
      type: "number",
      minimum: 0.1,
      default: 10,
    },
    description: "Search radius in kilometers",
  },
  RSVPStatusActionParam: {
    name: "status",
    in: "query",
    required: true,
    schema: {
      type: "string",
      enum: ["enable", "disable"],
    },
    description: "Enable converts RSVP to attending, disable marks RSVP as not attending",
  },
};
