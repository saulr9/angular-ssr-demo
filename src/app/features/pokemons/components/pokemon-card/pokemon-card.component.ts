import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
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
  pokemon!: Pokemon;
}
