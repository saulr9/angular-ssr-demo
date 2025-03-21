import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { sleep } from '../../../../shared/utils/sleep';

@Component({
  selector: 'app-pokemon-cry',
  imports: [NgIf],
  templateUrl: './pokemon-cry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCryComponent {
  @Input({
    required: true,
  })
  cryUrl!: string;

  isLoading = signal(false);

  async playCry() {
    this.isLoading.set(true);
    await sleep(200);
    const audio = new Audio(this.cryUrl);
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
}
