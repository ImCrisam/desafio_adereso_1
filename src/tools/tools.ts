import z from "zod";
import { getPokemon, getSwapiPeople, getSwapiPlanet } from "../conexions/ApisExternal.js";
import { server } from "../index.js";


server.tool(
"get-people-starwars",
"obtener atributos de una persona de el mundo de star wars",
{
    state: z.string().describe("nombre base sin cualquier título, rango o honorífico"),
},

( async (state:any) => {
    const people = await getSwapiPeople(state)
    return {
        content: [
          {
            type: "text",
            text: people,
          },
        ],
      };
})
)

server.tool(
  "get-planet-starwars",
  "obtener atributos de un planeta del mundo de star wars",
  {
    state: z.string().describe("nombre base del planeta sin traducciones ni decoraciones"),
  },
  async ({ state }: { state: string }) => {
    const planet = await getSwapiPlanet(state);
     return {
        content: [
          {
            type: "text",
            text: planet,
          },
        ],
      };
  }
);

server.tool(
  "get-pokemon",
  "obtener atributos de un pokémon",
  {
    state: z.string().describe("nombre del pokémon en minúsculas"),
  },
  async ({ state }: { state: string }) => {
    const pokemon = await getPokemon(state);
    return {
        content: [
          {
            type: "text",
            text: pokemon,
          },
        ],
      };
  }
);