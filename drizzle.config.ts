import { defineConfig } from "drizzle-kit";

const isTurso = !!process.env.TURSO_DATABASE_URL && process.env.TURSO_DATABASE_URL.startsWith("libsql://");

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  dialect: (isTurso ? "turso" : "sqlite") as any,
  dbCredentials: (isTurso
    ? {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      }
    : {
        url: "file:local.db",
      }) as any,
});
