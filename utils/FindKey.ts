export function extractKeysToMap(expression: string): Map<string, string> {
  const regex = /"([^"]+)"/g;
  const result = new Map<string, string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(expression)) !== null) {
    const key = match[1];

    if (!result.has(key)) {
      result.set(key, "");
    }
  }

  return result;
}

export function extractKeysToSet(expression: string): Set<string> {
  const regex = /"([^"]+)"/g;
  const result = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(expression)) !== null) {
    result.add(match[1]);
  }

  return result;
}