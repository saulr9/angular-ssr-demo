import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonsAPIResponse, SimplePokemon } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<SimplePokemon[]> {
    return this.http.get<PokemonsAPIResponse>(this.apiUrl).pipe(
      map((response) => {
        const pokemons = response.results.map((pokemon) => {
          const urlParts = pokemon.url.split('/');
          const id = urlParts[urlParts.length - 2];
          return {
            id,
            name: pokemon.name,
            url: pokemon.url,
          };
        });
        return pokemons;
      })
    );
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name}`);
  }
}
