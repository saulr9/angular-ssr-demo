export interface AllPokemons {
  count: number;
  next: string;
  previous: null;
  results: AllPokemonResult[];
}

export interface AllPokemonResult {
  name: string;
  url: string;
}
