import { Pokemon } from '../interfaces/pokemon';
import { SimplePokemon } from '../interfaces/pokemons';

/**
 * Maps a Pokemon object to a SimplePokemon object.
 * @param pokemon The Pokemon object to transform.
 * @returns A SimplePokemon object.
 */
export function mapPokemonToSimplePokemon(pokemon: Pokemon): SimplePokemon {
  return {
    id: pokemon.id.toString(),
    name: pokemon.name,
    url: pokemon.species.url,
  };
}
