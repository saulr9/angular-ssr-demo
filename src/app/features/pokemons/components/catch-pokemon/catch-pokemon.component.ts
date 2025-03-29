import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CaughtPokemonService } from '../../services/caught-pokemon.service';

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

  /*   @Output() pokemonCaughtChange = new EventEmitter<string>(); */

  private caughtPokemonService = inject(CaughtPokemonService);

  ngOnInit() {
    this.isCaught.set(
      this.caughtPokemonService.isPokemonCaught(this.pokemonId())
    );
  }

  catchPokemon() {
    const currentState = this.isCaught();
    if (currentState) {
      this.caughtPokemonService.removeCaughtPokemon(this.pokemonId());
    } else {
      this.caughtPokemonService.addCaughtPokemon(this.pokemonId());
    }
    this.isCaught.set(!currentState);
    /*     this.pokemonCaughtChange.emit(this.pokemonId()); */
  }
}
