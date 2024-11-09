"use server";

import { Poem } from "@/types";
import { safeParseJson } from "@/util/json";
import { cookies } from "next/headers";

export default async function server_getNewPoem() {
  const cookieStore = await cookies();
  const poemStr = cookieStore.get("new-poem")?.value;
  if (!poemStr) return null;

  return safeParseJson<Poem>(poemStr);
}
