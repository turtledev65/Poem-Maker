"use client";

import { Poem } from "@/types";
import isClient from "@/util/is-client";
import { safeParseJson } from "@/util/json";
import Cookie from "js-cookie";

export default function client_getNewPoem() {
  if (!isClient()) return null;

  const poemStr = Cookie.get("new-poem");
  if (!poemStr) return null;

  return safeParseJson<Poem>(poemStr);
}
