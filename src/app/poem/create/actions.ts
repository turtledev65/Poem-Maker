"use server";

import { db } from "@/db";
import { poemTable } from "@/db/schema";
import { Poem } from "@/types";

export async function savePoem(newPoem: Poem) {
  const [poem] = await db
    .insert(poemTable)
    .values({ ...newPoem })
    .returning();

  return poem;
}
