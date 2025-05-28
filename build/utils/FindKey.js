export function extractKeysToMap(expression) {
    const regex = /"([^"]+)"/g;
    const result = new Map();
    let match;
    while ((match = regex.exec(expression)) !== null) {
        const key = match[1];
        if (!result.has(key)) {
            result.set(key, "");
        }
    }
    return result;
}
export function extractKeysToSet(expression) {
    const regex = /"([^"]+)"/g;
    const result = new Set();
    let match;
    while ((match = regex.exec(expression)) !== null) {
        result.add(match[1]);
    }
    return result;
}
