import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CaughtPokemonComponent } from '../../features/pokemons/components/caught-pokemon/caught-pokemon.component';

@Component({
  selector: 'app-caughts-pokemon-page',
  imports: [CaughtPokemonComponent],
  templateUrl: './caught-pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CaughtsPokemonPageComponent {}
