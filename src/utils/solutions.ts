export function evaluateExpressionFromMap(
  expression: string,
  map: Map<string, any>
): number {
  const evaluated = expression.replace(/"([^"]+)"\.(\w+)/g, (_, key, prop) => {

    const cleanKey = key
    const obj = map.get(cleanKey);
    if (!obj) throw new Error(`Clave no encontrada en el mapa: ${key} : ${cleanKey} `);
    const value = obj[prop];
    if (value === undefined) throw new Error(`Propiedad "${prop}" no encontrada en "${key}"`);
    const num = Number((typeof value === 'string') ? value.replace(/,/g, '') : value);
    if (isNaN(num)) throw new Error(`Valor de "${key}.${prop}" no es numérico: ${value}`);
    return num.toString();
  });
  return parseFloat(eval(evaluated).toFixed(10));
}