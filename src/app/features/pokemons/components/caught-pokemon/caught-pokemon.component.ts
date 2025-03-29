import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemons';
import { PokemonService } from '../../services/pokemon.service';
import { mapPokemonToSimplePokemon } from '../../utils/pokemon-mapper';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-caught-pokemon',
  imports: [NgIf, NgFor, PokemonCardComponent],
  templateUrl: './caught-pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaughtPokemonComponent {
  caughtPokemons = signal<SimplePokemon[]>([]);

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    const caughtPokemonIds = this.pokemonService.getCaughtPokemons();
    const caughtPokemonDetails: SimplePokemon[] = [];

    caughtPokemonIds.forEach((id) => {
      this.pokemonService.getPokemonById(id).subscribe((pokemon) => {
        const simplePokemon = mapPokemonToSimplePokemon(pokemon);
        caughtPokemonDetails.push(simplePokemon);
        caughtPokemonDetails.sort(
          (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)
        );
        this.caughtPokemons.set([...caughtPokemonDetails]);
      });
    });
  }
}
