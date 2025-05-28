import axios from "axios";
import { aiPrompt } from "../pormpts/promptbase.js";
const API_TOKEN = process.env.API_TOKEN;
const SUBMIT_ENDPOINT = process.env.SUBMIT_ENDPOINT ?? "";
const START_ENDPOINT = process.env.START_ENDPOINT ?? "";
const CHAT_ENDPOINT = process.env.CHAT_ENDPOINT ?? "";
const TEST_ENDPOINT = process.env.TEST_ENDPOINT ?? "";
export async function submitSolution(problemId, answer, signal) {
    try {
        const response = await axios.post(SUBMIT_ENDPOINT, {
            problem_id: problemId,
            answer: answer
        }, {
            signal,
            headers: {
                Authorization: API_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Respuesta enviada con éxito:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('❌ Error al enviar la respuesta:', error.response?.data || error.message);
        throw error;
    }
}
export async function getProblemStart(signal) {
    try {
        const response = await axios.get(START_ENDPOINT, {
            signal,
            headers: {
                Authorization: API_TOKEN,
            },
        });
        return response;
    }
    catch (error) {
        console.error("❌ Error en getProblemStart:", error.message);
        throw error;
    }
}
export async function getProblemTest(signal) {
    try {
        const response = await axios.get(TEST_ENDPOINT, {
            signal,
            headers: {
                Authorization: API_TOKEN,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("❌ Error en getProblemTest:", { ...error });
        // throw error;  // Propaga error para manejarlo arriba si es necesario
    }
}
export async function translateWithAI(problem, signal) {
    const response = await axios.post(CHAT_ENDPOINT, {
        model: "gpt-4o-mini",
        messages: [
            { role: "developer", content: aiPrompt },
            { role: "user", content: problem }
        ]
    }, {
        signal,
        headers: {
            Authorization: API_TOKEN,
            "Content-Type": "application/json"
        }
    });
    const aiMessage = response.data.choices[0].message.content;
    if (!aiMessage)
        throw new Error("La IA no devolvió una expresión.");
    return aiMessage.trim();
}
