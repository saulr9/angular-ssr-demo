import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
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
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(page: number = 1): Observable<PokemonsResponse> {
    const LIMIT = 20;
    const offset = (page === 0 ? 1 - 1 : page - 1) * LIMIT;
    const simplePokemons: SimplePokemon[] = [];

    const response = this.http
      .get<PokemonsAPIResponse>(
        `${this.apiUrl}?offset=${offset}&limit=${LIMIT}`
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
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name}`);
  }
}
