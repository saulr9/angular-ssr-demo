import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-pokemon-image',
  imports: [NgIf],
  templateUrl: './pokemon-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonImageComponent {
  pokemonId = input.required();
  isLoading = signal(true);

  pokemonImageUrl = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId()}.png`;
  });

  pokemonImageUrlFallback = computed(() => {
    return `images/fallback.jpg`;
  });

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.pokemonImageUrlFallback();
  }

  onImageLoad() {
    this.isLoading.set(false);
  }
}
