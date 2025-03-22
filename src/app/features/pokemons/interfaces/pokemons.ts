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

export interface PokemonsResponse {
  count: number;
  next: string;
  previous: null;
  totalPages: number;
  results: SimplePokemon[];
}

export interface SimplePokemon {
  id: string;
  name: string;
  url: string;
}
