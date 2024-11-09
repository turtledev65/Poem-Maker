import { Appearance } from "@/types";
import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const poemTable = pgTable("poem", {
  title: text("title").notNull(),
  text: text("text").notNull(),
  appearance: jsonb().$type<Appearance>().notNull(),
});
