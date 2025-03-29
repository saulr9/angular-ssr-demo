import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { SimplePokemon } from '../interfaces/pokemons';
import { mapPokemonToSimplePokemon } from '../utils/pokemon-mapper';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class CaughtPokemonService {
  private readonly STORAGE_CAUGHT_POKEMONS_KEY = 'caughtPokemons';
  private caughtPokemonsSubject = new BehaviorSubject<SimplePokemon[]>([]);
  caughtPokemons$ = this.caughtPokemonsSubject.asObservable();
  private platformId = inject(PLATFORM_ID);

  constructor(private pokemonService: PokemonService) {
    this.loadCaughtPokemons();
  }

  private loadCaughtPokemons(): void {
    const caughtPokemonIds = this.getCaughtPokemons();

    const pokemonObservables = caughtPokemonIds.map((id) =>
      this.pokemonService.getPokemonById(id)
    );

    forkJoin(pokemonObservables).subscribe({
      next: (pokemons) => {
        const simplePokemons = pokemons
          .filter((pokemon) => pokemon !== undefined)
          .map((pokemon) => mapPokemonToSimplePokemon(pokemon))
          .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
        this.caughtPokemonsSubject.next(simplePokemons);
      },
      error: (error) => {
        console.error('Error fetching caught Pokémon:', error);
      },
    });
  }

  addCaughtPokemon(pokemonId: string): void {
    this.pokemonService.getPokemonById(pokemonId).subscribe({
      next: (pokemon) => {
        const simplePokemon = mapPokemonToSimplePokemon(pokemon);
        const currentPokemons = this.caughtPokemonsSubject.value;
        const updatedPokemons = [...currentPokemons, simplePokemon].sort(
          (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)
        );

        this.caughtPokemonsSubject.next(updatedPokemons);
        this.saveCaughtPokemonId(pokemonId);
      },
      error: (error) => {
        console.error('Error fetching Pokémon details:', error);
      },
    });
  }

  removeCaughtPokemon(pokemonId: string): void {
    const updatedPokemons = this.caughtPokemonsSubject.value.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    this.caughtPokemonsSubject.next(updatedPokemons);
    this.deleteCaughtPokemonId(pokemonId);
  }

  isPokemonCaught(pokemonId: string): boolean {
    return this.getCaughtPokemons().includes(pokemonId);
  }

  private getCaughtPokemons(): string[] {
    if (!this.isBrowser()) return [];
    const storedPokemons = localStorage.getItem(
      this.STORAGE_CAUGHT_POKEMONS_KEY
    );
    return storedPokemons ? JSON.parse(storedPokemons) : [];
  }

  private saveCaughtPokemonId(pokemonId: string): void {
    if (!this.isBrowser()) return;
    const caughtPokemons = this.getCaughtPokemons();

    if (caughtPokemons.includes(pokemonId)) return;

    caughtPokemons.push(pokemonId);
    localStorage.setItem(
      this.STORAGE_CAUGHT_POKEMONS_KEY,
      JSON.stringify(caughtPokemons)
    );
  }

  private deleteCaughtPokemonId(pokemonId: string): void {
    if (!this.isBrowser()) return;

    const caughtPokemons = this.getCaughtPokemons().filter(
      (id) => id !== pokemonId
    );
    localStorage.setItem(
      this.STORAGE_CAUGHT_POKEMONS_KEY,
      JSON.stringify(caughtPokemons)
    );
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
