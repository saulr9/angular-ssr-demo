import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import {
  Chain,
  EvolutionChainApiResponse,
} from '../interfaces/evolution-chain';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonSpeciesApiResponse } from '../interfaces/pokemon-species';
import {
  PokemonsAPIResponse,
  PokemonsAPIResponseResult,
  PokemonsResponse,
  SimplePokemon,
} from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(page: number = 1): Observable<PokemonsResponse> {
    const LIMIT = 20;
    const offset = (page === 0 ? 1 - 1 : page - 1) * LIMIT;
    const simplePokemons: SimplePokemon[] = [];

    const response = this.http
      .get<PokemonsAPIResponse>(
        `${this.apiUrl}/pokemon?offset=${offset}&limit=${LIMIT}`
      )
      .pipe(
        map((response) => {
          response.results.forEach((result: PokemonsAPIResponseResult) => {
            const urlParts = result.url.split('/');
            const id = urlParts[urlParts.length - 2];
            simplePokemons.push({
              id,
              name: result.name,
              url: result.url,
            });
          });
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            totalPages: Math.ceil(response.count / LIMIT),
            results: simplePokemons,
          };
        })
      );
    return response;
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`);
  }
  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${name}`);
  }

  getEvolutions(chain: string): Observable<EvolutionChainApiResponse> {
    return this.http.get<EvolutionChainApiResponse>(
      `${this.apiUrl}/evolution-chain/${chain}`
    );
  }

  getEvolutionChainId(pokemonIdOrName: string | number): Observable<string> {
    return this.getPokemonSpecies(pokemonIdOrName).pipe(
      map((species) => {
        return species.evolution_chain.url.split('/').reverse()[1];
      })
    );
  }

  getPokemonSpecies(
    pokemonIdOrName: string | number
  ): Observable<PokemonSpeciesApiResponse> {
    return this.http.get<PokemonSpeciesApiResponse>(
      `${this.apiUrl}/pokemon-species/${pokemonIdOrName}`
    );
  }
  getPokemonEvolutions(pokemonId: number): Observable<SimplePokemon[]> {
    return this.getEvolutionChainId(pokemonId).pipe(
      switchMap((chainId) => this.getEvolutions(chainId)),
      map((evolutions) => {
        const simplePokemons: SimplePokemon[] = [];
        this.extractEvolutions(evolutions.chain, simplePokemons);
        return simplePokemons;
      })
    );
  }

  private extractEvolutions(chain: Chain, simplePokemons: SimplePokemon[]) {
    const urlParts = chain.species.url.split('/');
    const id = urlParts[urlParts.length - 2];
    simplePokemons.push({
      id,
      name: chain.species.name,
      url: chain.species.url,
    });

    chain.evolves_to.forEach((evolution) => {
      this.extractEvolutions(evolution, simplePokemons);
    });
  }
}
