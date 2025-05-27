import { getProblemTest, translateWithAI } from "./conexions/ApiChallenge";
import { Entity, problem, problemTest, submitProblemTest } from "./models/models";
import { extractKeysToMap, extractKeysToSet } from "./utils/FindKey";
import { resolveEntitiesWithSaving, resolveTaggedAndUntaggedEntities } from "./utils/resolveInfo";
import { evaluateExpressionFromMap } from "./utils/solutions";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log(process.env.API_TOKEN);
console.log(process.env.START_ENDPOINT);
console.log(process.env.SUBMIT_ENDPOINT);

const MAX_WORKERS = 5;
let running = true;

const mapEntitiesSaving: Map<string, Entity> = new Map<string, Entity>()

let controller = new AbortController();
const problemQueue: problemTest[] = []
const submitProblems: submitProblemTest[] = [];

let correctCount = 0;
let incorrectCount = 0;
let countSavedUsed = 0


function evaluateAnswer(test: submitProblemTest) {
    const expected = test.problem.solution;
    const actual = test.result;

    const isCorrect = expected === actual;
    test.isOk = isCorrect;


      if (isCorrect) {
        correctCount++;
        console.log(`${test.problem.id} ✅`);
    } else {
        incorrectCount++;
        console.log(`\n❌ INCORRECTO`);
        console.log(`🆔 ID del problema: ${test.problem.id}`);
        console.log(`🧮 Expresión esperada (texto original): ${test.problem.expression}`);
        console.log(`🧠 Expresión procesada: ${test.resultExpression}`);
        console.log(`🔢 Resultado esperado: ${expected}`);
        console.log(`🔍 Resultado obtenido: ${actual}`);
        if (test.entitiesUsed?.length) {
            console.log(`📦 Entidades usadas:`);
            for (const entity of test.entitiesUsed) {
                console.log(`  - ${entity}`);
            }
        }
        console.log('---------------------------------------------');
    }

    return isCorrect;
}


function startWorkers() {

    for (let i = 0; i < MAX_WORKERS; i++) {
        (
            async function worker() {
                while (running) {
                    const problem = problemQueue.shift();
                    if (problem) {
                        try {
                            const operation = await translateWithAI(problem.problem, controller.signal);
                            const arrayEntities = [...extractKeysToSet(operation)]
                            countSavedUsed += await resolveEntitiesWithSaving(arrayEntities, mapEntitiesSaving, controller.signal);
                            const result = evaluateExpressionFromMap(operation, mapEntitiesSaving);
                            submitProblems.push({ result, problem, resultExpression: operation })
                            evaluateAnswer({result, problem, resultExpression: operation, entitiesUsed:arrayEntities })
                        } catch (e) {

                        }
                    } else {
                        const response = await getProblemTest()
                        problemQueue.push(response)
                    }
                }


            })()

    }

}


async function init() {
     startWorkers()

    setTimeout(() => {
    console.log("🛑 Tiempo límite alcanzado. Cancelando operaciones...");

    running = false;              // Detiene el loop de los workers
    controller.abort();           // Aborta todas las peticiones pendientes
    console.log("\n--- 🧾 Resumen Final ---");
    console.log(`✅ Correctas: ${correctCount}`);
    console.log(`❌ Incorrectas: ${incorrectCount}`);
    console.log(`🧠 Total evaluadas: ${correctCount + incorrectCount}`);
    console.log("✅ Proceso finalizado.");
    console.log("used "+ countSavedUsed);
    
  }, 0.2 * 60 * 1000);

}
init()