import { validatePokemon, validateStarWarsCharacter, validateStarWarsPlanet } from "../models/adapters";
import axios from "axios";



const SWAPI = "https://swapi.dev/api";
const POKEAPI = "https://pokeapi.co/api/v2";


async function getSwapiPeople(name: string, signal?: AbortSignal): Promise<any> {
  const url = `${SWAPI}/people?search=${name}`
  const response = await axios.get(url, { signal });
  const rest = validateStarWarsCharacter(response.data.results[0]);

  // console.log("getSwapiPeople " + url);
  // console.log({...rest});
  return rest
}

async function getSwapiPlanet(name: string, signal?: AbortSignal): Promise<any> {
  const url = `${SWAPI}/planets?search=${name}`
  const response = await axios.get(url, { signal });
  const rest = validateStarWarsPlanet(response.data.results[0]);

  // console.log("getSwapiPlanet " + url);
  // console.log( {...rest});
  return rest

}

async function getPokemon(name: string, signal?: AbortSignal ): Promise<any> {
  const url = `${POKEAPI}/pokemon/${name}`
  const response = await axios.get(url, { signal });
  const rest = validatePokemon(response.data);

  // console.log("getPokemon " + url);
  // console.log({...rest});
  return rest
}

export const fetchMap = new Map<string, (name: string,  signal?: AbortSignal) => Promise<any>>([
  ["Pokemon", getPokemon],
  ["StarWarsCharacter", getSwapiPeople],
  ["StarWarsPlanet", getSwapiPlanet]
]);
