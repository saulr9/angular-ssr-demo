import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
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
  private readonly STORAGE_CAUGHT_POKEMONS_KEY = 'caughtPokemons';
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

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

  public addCaughtPokemon(pokemonId: string): void {
    if (!this.isBrowser()) {
      return;
    }
    const caughtPokemons = this.getCaughtPokemons();
    if (!caughtPokemons.includes(pokemonId)) {
      caughtPokemons.push(pokemonId);
      localStorage.setItem(
        this.STORAGE_CAUGHT_POKEMONS_KEY,
        JSON.stringify(caughtPokemons)
      );
    }
  }

  public removeCaughtPokemon(pokemonId: string): void {
    if (!this.isBrowser()) {
      return;
    }
    const caughtPokemons = this.getCaughtPokemons().filter(
      (id) => id !== pokemonId
    );
    localStorage.setItem(
      this.STORAGE_CAUGHT_POKEMONS_KEY,
      JSON.stringify(caughtPokemons)
    );
  }

  public isPokemonCaught(pokemonId: string): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    return this.getCaughtPokemons().includes(pokemonId);
  }

  public getCaughtPokemons(): string[] {
    const storedPokemons = localStorage.getItem(
      this.STORAGE_CAUGHT_POKEMONS_KEY
    );
    return storedPokemons ? JSON.parse(storedPokemons) : [];
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

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
