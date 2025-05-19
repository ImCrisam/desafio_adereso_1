import { Pokemon, StarWarsCharacter, StarWarsPlanet } from "./models"


function parseNumberOrNull(value: any): number | null {
  if (typeof value === "number") {
    return isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : null;
  }

  return null;
}

/**
 * Validates if an object conforms to the StarWarsPlanet interface
 * @param data Any object to validate
 * @returns The validated StarWarsPlanet object or null if invalid
 */
export function validateStarWarsPlanet(data: any): StarWarsPlanet | null {
  // Check if data is an object
  if (!data || typeof data !== "object") return null

  // Return the validated object
  return {
    name: data?.name,
    rotation_period: data?.rotation_period,
    orbital_period: data?.orbital_period,
    diameter: data?.diameter,
    surface_water: data?.surface_water,
    population: data?.population,
  }
}

/**
 * Validates if an object conforms to the StarWarsCharacter interface
 * @param data Any object to validate
 * @returns The validated StarWarsCharacter object or null if invalid
 */
export function validateStarWarsCharacter(data: any): StarWarsCharacter | null {
  // Check if data is an object
  if (!data || typeof data !== "object") return null

  // Return the validated object
  return {
    name: data?.name,
    height: data?.height,
    mass: data?.mass,
    homeworld: data?.homeworld,
  }
}

/**
 * Validates if an object conforms to the Pokemon interface
 * @param data Any object to validate
 * @returns The validated Pokemon object or null if invalid
 */
export function validatePokemon(data: any): Pokemon | null {
  // Check if data is an object
  if (!data || typeof data !== "object") return null

  // Check if all required properties exist and have correct types
  if (
    typeof data.name !== "string" ||
    typeof data.base_experience !== "number" ||
    typeof data.height !== "number" ||
    typeof data.weight !== "number"
  ) {
    return null
  }

  // Return the validated object
  return {
    name: data.name,
    base_experience: data.base_experience,
    height: data.height,
    weight: data.weight,
  }
}
