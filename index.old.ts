
import { fetchMap } from "./conexions/ApisExternal.js";
import { getProblemStart, submitSolution, translateWithAI } from "./conexions/ApiChallenge.js";
import { extractKeysToMap } from "./utils/FindKey.js";
import { resolveTaggedAndUntaggedEntities } from "./utils/resolveInfo.js";
import { evaluateExpressionFromMap } from "./utils/solutions.js";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


console.log(process.env.API_TOKEN);
console.log(process.env.START_ENDPOINT);
console.log(process.env.SUBMIT_ENDPOINT);

let lastProblemId: string | null = null;
let errorCount = 0;
async function runTest(problem: string | null = null, idProblem: string | null = null) {

  if (!problem || !idProblem) {
  
    const response = await getProblemStart();
    problem = response.data.problem;
    idProblem = response.data.id;
  }

  if (problem && idProblem) {
    if (idProblem !== lastProblemId) {
      errorCount = 0;
      lastProblemId = idProblem;
    }
    try {
      const operation = await translateWithAI(problem);
      const mapObjs = extractKeysToMap(operation);
      const infoObj = await resolveTaggedAndUntaggedEntities([...mapObjs.keys()]);
      const result = evaluateExpressionFromMap(operation, infoObj);
      const resSubmit = await submitSolution(idProblem, result)

      if (resSubmit.next_problem) {
        // llamada recursiva con los datos del siguiente problema
        await runTest(resSubmit.next_problem.problem, resSubmit.next_problem.id);
      } else {
        console.log({ ...resSubmit });
      }

    } catch (error) {
      if (idProblem === lastProblemId) {
        errorCount++;
      } else {
        errorCount = 1;
        lastProblemId = idProblem;
      }

      if (errorCount >= 2) {
        console.log("🔄 Demasiados errores con este problema. Reiniciando con uno nuevo...");
        errorCount = 0;
        lastProblemId = null;
        await runTest(); // Reiniciar completamente
      } else {
        await runTest(problem, idProblem); // Reintento del mismo problema
      }

    }

  }




  // console.log("📊 ", opetarion);
  // console.log(`result: ${result}`);





}


// runTest().catch(console.error);
