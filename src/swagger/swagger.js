import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { schemas } from "./components/schemas.js";
import { securitySchemes } from "./components/security.js";
import { responses } from "./components/responses.js";
import { parameters } from "./components/parameters.js";
import { paths } from "./paths/index.js";

const definition = {
	openapi: "3.0.3",
	info: {
		title: "MongooseMeet API",
		version: "1.0.0",
		description:
			"Comprehensive OpenAPI documentation for the MongooseMeet event management backend.",
	},
	servers: [
		{
			url: "http://localhost:5000",
			description: "Local development server",
		},
	],
	tags: [
		{ name: "Auth", description: "Authentication and session lifecycle" },
		{ name: "Users", description: "Current user profile and user-linked data" },
		{ name: "Categories", description: "Event category management" },
		{ name: "Events", description: "Event discovery and lifecycle operations" },
		{ name: "Event Roles", description: "Role assignments inside an event" },
		{ name: "Sessions", description: "Event session management" },
		{ name: "RSVP", description: "Event RSVP and attendance workflow" },
		{ name: "Waitlist", description: "Event waitlist queries" },
		{ name: "Feedback", description: "Event feedback and helpful votes" },
		{ name: "Notifications", description: "User notification operations" },
	],
	components: {
		schemas,
		securitySchemes,
		responses,
		parameters,
	},
	paths,
};

const swaggerOptions = {
	definition,
	apis: [],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerSpec, {
			explorer: true,
		})
	);

	app.get("/api-docs.json", (_req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
};

