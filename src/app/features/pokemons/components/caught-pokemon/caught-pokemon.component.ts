import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemons';
import { CaughtPokemonService } from '../../services/caught-pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-caught-pokemon',
  imports: [NgIf, NgFor, PokemonCardComponent],
  templateUrl: './caught-pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaughtPokemonComponent {
  caughtPokemons = signal<SimplePokemon[]>([]);

  private caughtPokemonService = inject(CaughtPokemonService);

  ngOnInit(): void {
    this.caughtPokemonService.caughtPokemons$.subscribe((pokemons) => {
      this.caughtPokemons.set(pokemons);
    });
  }

  pokemonCaughtChange(pokemonId: string): void {
    this.caughtPokemonService.removeCaughtPokemon(pokemonId);
  }
}
