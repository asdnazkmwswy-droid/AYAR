import { Hono } from "hono";
import { cors } from "hono/cors";

type Env = {
  DB?: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors({
  origin: (origin) => origin,
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 600
}));

app.get("/health", (c) => c.json({
  ok: true,
  service: "ayar-api",
  status: "foundation",
  databaseConfigured: Boolean(c.env.DB)
}));

app.get("/api/v1", (c) => c.json({
  name: "AYAR API",
  version: "v1",
  message: "API foundation is running"
}));

app.notFound((c) => c.json({ error: "Not found" }, 404));

export default app;
