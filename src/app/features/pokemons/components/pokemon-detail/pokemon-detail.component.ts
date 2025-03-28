import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { BgByType, BgByTypes } from '../../../../shared/utils/bg-by-types';
import { leadZeroId } from '../../../../shared/utils/lead-zero-id';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonCryComponent } from '../pokemon-cry/pokemon-cry.component';
import { PokemonEvolutionsComponent } from '../pokemon-evolutions/pokemon-evolutions.component';

import { MatChipsModule } from '@angular/material/chips';
import { CatchPokemonComponent } from '../catch-pokemon/catch-pokemon.component';

@Component({
  selector: 'app-pokemon-detail',
  imports: [
    NgClass,
    PokemonCryComponent,
    PokemonEvolutionsComponent,
    MatChipsModule,
    CatchPokemonComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  public pokemon = input.required<Pokemon>();

  pokemonLeadId = computed(() => {
    return leadZeroId(this.pokemon().id.toString());
  });

  public bgByType = computed(() => {
    const currentPokemon = this.pokemon();
    if (
      currentPokemon &&
      currentPokemon.types &&
      currentPokemon.types.length > 0
    ) {
      const typeName = currentPokemon.types[0].type
        .name as keyof typeof BgByTypes;
      return BgByType(typeName);
    }
    return BgByTypes.default;
  });

  public firstMoves = computed(() => {
    return this.pokemon().moves.slice(0, 5);
  });
}
