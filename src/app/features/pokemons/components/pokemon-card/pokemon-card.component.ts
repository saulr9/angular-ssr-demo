import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemons';
import { PokemonCryComponent } from '../pokemon-cry/pokemon-cry.component';
import { PokemonImageComponent } from '../pokemon-image/pokemon-image.component';

@Component({
  selector: 'app-pokemon-card',
  imports: [PokemonCryComponent, PokemonImageComponent],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  @Input({
    required: true,
  })
  pokemon!: SimplePokemon;

  pokemonLeadId = computed(() => {
    return this.pokemon.id.toString().padStart(3, '0');
  });
}
