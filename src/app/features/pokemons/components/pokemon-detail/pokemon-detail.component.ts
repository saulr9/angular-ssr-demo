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

@Component({
  selector: 'app-pokemon-detail',
  imports: [NgClass, PokemonCryComponent, PokemonEvolutionsComponent],
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
}
