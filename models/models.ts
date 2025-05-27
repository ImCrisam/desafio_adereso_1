export interface StarWarsPlanet {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  surface_water: number;
  population: number;
}
export interface StarWarsCharacter {
  name: string;
  height: number;
  mass: number;
  homeworld: string;
}
export interface Pokemon {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
}

export type Entity = StarWarsPlanet | StarWarsCharacter | Pokemon

export interface problem {
  id: string,
  problem: string,
}

export interface problemTest {
  id: string,
  problem: string,
  expression: string,
  solution: number
}

export interface submitProblem{
  result:number
  problem:problem
}

export interface submitProblemTest{
  result:number
  resultExpression?: string
  entitiesUsed?:string[]
  isOk?: boolean
  problem:problemTest
}