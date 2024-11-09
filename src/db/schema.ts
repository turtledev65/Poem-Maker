import { Appearance } from "@/types";
import { jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";

export const poemTable = pgTable("poem", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  appearance: jsonb().$type<Appearance>().notNull(),
});
