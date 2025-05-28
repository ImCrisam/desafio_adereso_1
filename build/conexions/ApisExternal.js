process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import dotenv from "dotenv";
dotenv.config();
import { validatePokemon, validateStarWarsCharacter, validateStarWarsPlanet } from "../models/adapters.js";
import axios from "axios";
const SWAPI = "https://swapi.dev/api";
const POKEAPI = "https://pokeapi.co/api/v2";
export async function getSwapiPeople(name, signal) {
    const url = `${SWAPI}/people?search=${name}`;
    try {
        const response = await axios.get(url, { signal });
        const rest = validateStarWarsCharacter(response.data.results[0]);
        return rest;
    }
    catch (error) {
        console.error(`Error in getSwapiPeople: ${url}`, error);
        throw error;
    }
}
export async function getSwapiPlanet(namePlanet, signal) {
    const url = `${SWAPI}/planets?search=${namePlanet}`;
    try {
        const response = await axios.get(url, { signal });
        const rest = validateStarWarsPlanet(response.data.results[0]);
        return rest;
    }
    catch (error) {
        console.error(`Error in getSwapiPlanet: ${url}`, error);
        throw error;
    }
}
export async function getPokemon(name, signal) {
    const url = `${POKEAPI}/pokemon/${name}`;
    try {
        const response = await axios.get(url, { signal });
        const rest = validatePokemon(response.data);
        return rest;
    }
    catch (error) {
        console.error(`Error in getPokemon: ${url}`, error);
        throw error;
    }
}
export const fetchMap = new Map([
    ["Pokemon", getPokemon],
    ["StarWarsCharacter", getSwapiPeople],
    ["StarWarsPlanet", getSwapiPlanet]
]);
