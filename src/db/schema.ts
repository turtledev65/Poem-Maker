import { Appearance } from "@/types";
import { jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";

export const poemTable = pgTable("poem", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  image: text("image"),
  appearance: jsonb().$type<Appearance>().notNull(),
});
