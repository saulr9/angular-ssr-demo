import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemons';
import { PokemonCryComponent } from '../pokemon-cry/pokemon-cry.component';

@Component({
  selector: 'app-pokemon-card',
  imports: [PokemonCryComponent],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  @Input({
    required: true,
  })
  pokemon!: SimplePokemon;

  pokemonImageUrl = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon.id}.png`;
  });

  pokemonLeadId = computed(() => {
    return this.pokemon.id.toString().padStart(3, '0');
  });
}
