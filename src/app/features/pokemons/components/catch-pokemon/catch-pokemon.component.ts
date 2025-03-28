import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-catch-pokemon',
  imports: [NgClass],
  templateUrl: './catch-pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatchPokemonComponent implements OnInit {
  public pokemonId = input.required<string>();
  public isCaught = signal<boolean>(false);

  public pokeballImageUrl = signal<string>('images/pokeball.png');

  private pokemonService = inject(PokemonService);

  ngOnInit() {
    this.isCaught.set(this.pokemonService.isPokemonCaught(this.pokemonId()));
  }

  catchPokemon() {
    const currentState = this.isCaught();
    if (currentState) {
      this.pokemonService.removeCaughtPokemon(this.pokemonId());
    } else {
      this.pokemonService.addCaughtPokemon(this.pokemonId());
    }
    this.isCaught.set(!currentState);
  }
}
