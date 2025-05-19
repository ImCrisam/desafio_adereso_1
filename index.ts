import axios from "axios";
import { aiPrompt } from "./promptbase.ts";

import { resolveTaggedAndUntaggedEntities } from "./resolveInfo.ts";
import { fetchMap } from "./apisExternal.ts";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


console.log(process.env.API_TOKEN);
console.log(process.env.START_ENDPOINT);
console.log(process.env.SUBMIT_ENDPOINT);

// async function translateWithAI(problem: string): Promise<string> {
//   const response = await axios.post(
//     "https://recruiting.adere.so/chat_completion",
//     {
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "developer", content: aiPrompt },
//         { role: "user", content: problem }
//       ]
//     },
//     {
//       headers: {
//         Authorization: API_TOKEN,
//         "Content-Type": "application/json"
//       }
//     }
//   );

//   console.log("res ia " + response.data);

//   const aiMessage = response.data.choices[0].message.content;
//   if (!aiMessage) throw new Error("La IA no devolvió una expresión.");
//   return aiMessage.trim();
// }

// function extractKeysToMap(expression: string): Map<string, string> {
//   const regex = /"([^"]+)"/g;
//   const result = new Map<string, string>();
//   let match: RegExpExecArray | null;

//   while ((match = regex.exec(expression)) !== null) {
//     const key = match[1];

//     if (!result.has(key)) {
//       result.set(key, "");
//     }
//   }

//   return result;
// }

// function evaluateExpressionFromMap(
//   expression: string,
//   map: Map<string, any>
// ): number {
//   const evaluated = expression.replace(/"([^"]+)"\.(\w+)/g, (_, key, prop) => {
//     console.log("key: " + key);

//     const cleanKey = key
//     const obj = map.get(cleanKey);
//     if (!obj) throw new Error(`Clave no encontrada en el mapa: ${key} : ${cleanKey} `);
//     const value = obj[prop];
//     if (value === undefined) throw new Error(`Propiedad "${prop}" no encontrada en "${key}"`);
//     const num = Number((typeof value === 'string') ? value.replace(/,/g, '') : value);
//     if (isNaN(num)) throw new Error(`Valor de "${key}.${prop}" no es numérico: ${value}`);
//     return num.toString();
//   });
//   return parseFloat(eval(evaluated).toFixed(10));
// }

// async function submitSolution(problemId: string, answer: number) {
//   try {
//     const response = await axios.post(SUBMIT_ENDPOINT, {
//       problem_id: problemId,
//       answer: answer
//     }, {
//       headers: {
//         Authorization: API_TOKEN,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('✅ Respuesta enviada con éxito:', response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error('❌ Error al enviar la respuesta:', error.response?.data || error.message);
//     throw error;
//   }
// }

// let lastProblemId: string | null = null;
// let errorCount = 0;
// async function runTest(problem: string | null = null, idProblem: string | null = null) {

//   if (!problem || !idProblem) {
//     const response = await axios.get(START_ENDPOINT, {
//       headers: {
//         Authorization: API_TOKEN
//       }
//     });

//     problem = response.data.problem;
//     idProblem = response.data.id;
//   }

//   if (problem && idProblem) {
//     if (idProblem !== lastProblemId) {
//       errorCount = 0;
//       lastProblemId = idProblem;
//     }
//     try {
//       const operation = await translateWithAI(problem);
//       const mapObjs = extractKeysToMap(operation);
//       const infoObj = await resolveTaggedAndUntaggedEntities([...mapObjs.keys()], fetchMap);
//       const result = evaluateExpressionFromMap(operation, infoObj);
//       const resSubmit = await submitSolution(idProblem, result)

//       if (resSubmit.next_problem) {
//         // llamada recursiva con los datos del siguiente problema
//         await runTest(resSubmit.next_problem.problem, resSubmit.next_problem.id);
//       } else {
//         console.log({ ...resSubmit });
//       }

//     } catch (error) {
//       if (idProblem === lastProblemId) {
//         errorCount++;
//       } else {
//         errorCount = 1;
//         lastProblemId = idProblem;
//       }

//       if (errorCount >= 2) {
//         console.log("🔄 Demasiados errores con este problema. Reiniciando con uno nuevo...");
//         errorCount = 0;
//         lastProblemId = null;
//         await runTest(); // Reiniciar completamente
//       } else {
//         await runTest(problem, idProblem); // Reintento del mismo problema
//       }

//     }

//   }




//   // console.log("📊 ", opetarion);
//   // console.log(`result: ${result}`);





// }


// runTest().catch(console.error);
