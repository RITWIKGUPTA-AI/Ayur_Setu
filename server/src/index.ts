import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorHandler, notFound } from "./middleware/errorHandler";

import { profileRouter } from "./routes/profile.routes";
import { quizRouter } from "./routes/quiz.routes";
import { chatRouter } from "./routes/chat.routes";
import { internshipsRouter } from "./routes/internships.routes";
import { notificationsRouter } from "./routes/notifications.routes";
import { analyticsRouter } from "./routes/analytics.routes";
import { certificatesRouter } from "./routes/certificates.routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/health", (_req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use("/api/profile", profileRouter);
app.use("/api/quizzes", quizRouter);
app.use("/api/chat", chatRouter);
app.use("/api/internships", internshipsRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/certificates", certificatesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`AyurSetu backend listening on port ${env.port} (${env.nodeEnv})`);
});
