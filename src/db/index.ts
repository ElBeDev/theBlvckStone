import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// `db` is null until DATABASE_URL is set (e.g. after provisioning Supabase
// or a self-hosted Postgres on the VPS). Callers must handle the null case.
export const db = connectionString
  ? drizzle(postgres(connectionString, { prepare: false }), { schema })
  : null;
