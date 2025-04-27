import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import helmetConfig from "./config/helmet.config.js";
import corsConfig from "./config/cors.config.js";
import rateLimitMiddleware from "./middlewares/rateLimit.middleware.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import eventRoutes from "./routes/event.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import waitlistRoutes from "./routes/waitlist.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(morgan("common"));

app.use(helmetConfig);
app.use(rateLimitMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/waitlist", waitlistRoutes);

app.use(errorHandler);

await connectDB();

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
