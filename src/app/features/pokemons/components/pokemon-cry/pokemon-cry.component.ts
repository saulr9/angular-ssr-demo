import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { sleep } from '../../../../shared/utils/sleep';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-cry',
  imports: [NgIf],
  templateUrl: './pokemon-cry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCryComponent {
  cryUrl = input<string | null>(null);
  pokemonId = input<string | null>(null);

  cryUrlSignal = signal<string>('');
  isLoading = signal(false);

  pokemonService = inject(PokemonService);

  async playCry() {
    this.isLoading.set(true);
    await sleep(200);

    if (!this.cryUrl() && !this.pokemonId()) {
      this.isLoading.set(false);
      return;
    }

    if (this.cryUrl) {
      this.cryUrlSignal.set(this.cryUrl()!);
    }

    if (this.pokemonId) {
      await this.getPokemonCryById(this.pokemonId()!);
    }

    const audio = new Audio(this.cryUrlSignal());
    audio.oncanplaythrough = () => {
      this.isLoading.set(false);
      audio.play();
    };
    audio.onended = () => {
      this.isLoading.set(false);
    };
    audio.onerror = () => {
      this.isLoading.set(false);
      alert('Failed to load the cry sound.');
    };
  }

  async getPokemonCryById(pokemonId: string) {
    const pokemon = await firstValueFrom(
      this.pokemonService.getPokemonById(pokemonId)
    );
    this.cryUrlSignal.set(pokemon.cries.latest);
  }
}
