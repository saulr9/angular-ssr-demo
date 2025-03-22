export interface PokemonsAPIResponse {
  count: number;
  next: string;
  previous: null;
  results: PokemonsAPIResponseResult[];
}

export interface PokemonsAPIResponseResult {
  name: string;
  url: string;
}

export interface SimplePokemon {
  id: string;
  name: string;
  url: string;
}
