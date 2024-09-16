import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "api",
  password: "api",
  database: "finso",
});

await client.connect();

export const db = drizzle(client);
