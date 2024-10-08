import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, client } from "./database";

await migrate(db, { migrationsFolder: "./drizzle" }).finally(() =>
  client.end()
);
