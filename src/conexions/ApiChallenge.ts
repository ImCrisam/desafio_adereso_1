import { problemTest } from "../src/models/models";
import axios from "axios";

import { aiPrompt } from "../src/pormpts/promptbase";

const API_TOKEN = process.env.API_TOKEN
const SUBMIT_ENDPOINT = process.env.SUBMIT_ENDPOINT ?? ""
const START_ENDPOINT = process.env.START_ENDPOINT ?? ""
const CHAT_ENDPOINT = process.env.CHAT_ENDPOINT ?? ""
const TEST_ENDPOINT = process.env.TEST_ENDPOINT ?? ""

export async function submitSolution(problemId: string, answer: number, signal?: AbortSignal) {
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
    } catch (error: any) {
        console.error('❌ Error al enviar la respuesta:', error.response?.data || error.message);
        throw error;
    }
}


export async function getProblemStart(signal?: AbortSignal) {
  try {
    const response = await axios.get(START_ENDPOINT, {
      signal,
      headers: {
        Authorization: API_TOKEN,
      },
    });
    return response;
  } catch (error: any) {
    console.error("❌ Error en getProblemStart:", error.message);
    throw error;
  }
}

export async function getProblemTest(signal?: AbortSignal): Promise<problemTest | undefined> {
  try {
    const response = await axios.get(TEST_ENDPOINT, {
      signal,
      headers: {
        Authorization: API_TOKEN,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Error en getProblemTest:", {...error});
    // throw error;  // Propaga error para manejarlo arriba si es necesario
  }
}



export async function translateWithAI(problem: string, signal?: AbortSignal): Promise<string> {
    const response = await axios.post(
        CHAT_ENDPOINT,
        {
            model: "gpt-4o-mini",
            messages: [
                { role: "developer", content: aiPrompt },
                { role: "user", content: problem }
            ]
        },
        {
            signal,
            headers: {
                Authorization: API_TOKEN,
                "Content-Type": "application/json"
            }
        }
    );

    const aiMessage = response.data.choices[0].message.content;
    if (!aiMessage) throw new Error("La IA no devolvió una expresión.");
    return aiMessage.trim();
}