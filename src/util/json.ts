export function safeParseJson<T>(json: string ) {
  try {
    const value = JSON.parse(json);
    return value as T;
  } catch {
    return null;
  }
}
