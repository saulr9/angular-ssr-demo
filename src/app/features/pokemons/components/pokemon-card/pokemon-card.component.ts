import { NgIf, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { leadZeroId } from '../../../../shared/utils/lead-zero-id';
import { SimplePokemon } from '../../interfaces/pokemons';
import { CatchPokemonComponent } from '../catch-pokemon/catch-pokemon.component';
import { PokemonCryComponent } from '../pokemon-cry/pokemon-cry.component';
import { PokemonImageComponent } from '../pokemon-image/pokemon-image.component';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    PokemonCryComponent,
    PokemonImageComponent,
    CatchPokemonComponent,
    NgIf,
  ],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  @Input({
    required: true,
  })
  pokemon!: SimplePokemon;

  showCatchPokemon = input<boolean>(false);

  private router = inject(Router);

  private viewportScroller = inject(ViewportScroller);

  pokemonLeadId = computed(() => {
    return leadZeroId(this.pokemon.id.toString());
  });

  navigateToPokemon() {
    this.router.navigate(['/pokemon', this.pokemon.name]);
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
