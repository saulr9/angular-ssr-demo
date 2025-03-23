import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { leadZeroId } from '../../../../shared/utils/lead-zero-id';
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
  private router = inject(Router);

  pokemonLeadId = computed(() => {
    return leadZeroId(this.pokemon.id.toString());
  });

  navigateToPokemon() {
    console.log('Navigate to pokemon', this.pokemon.name);
    this.router.navigate(['/pokemon', this.pokemon.name]);
  }
}
