import z from "zod";
import { getPokemon, getSwapiPeople, getSwapiPlanet } from "../conexions/ApisExternal.js";
export function createTools(server) {
    server.tool("get-people-starwars", "obtener atributos de una persona de el mundo de star wars", {
        state: z.string().describe("nombre base sin cualquier título, rango o honorífico"),
    }, (async (state) => {
        const people = await getSwapiPeople(state);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(people),
                },
            ],
        };
    }));
    server.tool("get-planet-starwars", "obtener atributos de un planeta del mundo de star wars", {
        state: z.string().describe("nombre base del planeta sin traducciones ni decoraciones"),
    }, async ({ state }) => {
        const planet = await getSwapiPlanet(state, undefined);
        if (!planet) {
            return {
                content: [
                    {
                        type: "text",
                        text: `No se encontró información sobre el planeta "${JSON.stringify(state)}".`,
                    },
                ],
            };
        }
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(planet),
                },
            ],
        };
    });
    server.tool("get-pokemon", "obtener atributos de un pokémon", {
        state: z.string().describe("nombre del pokémon en minúsculas"),
    }, async ({ state }) => {
        const pokemon = await getPokemon(state);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(pokemon),
                },
            ],
        };
    });
}
