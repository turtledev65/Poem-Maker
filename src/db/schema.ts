import { pgTable, varchar } from "drizzle-orm/pg-core";

export const Article = pgTable("poem", {
  title: varchar("title").notNull(),
  text: varchar("text").notNull(),
});
