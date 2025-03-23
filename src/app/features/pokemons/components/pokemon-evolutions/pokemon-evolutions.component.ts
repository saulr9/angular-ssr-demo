import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemons';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-evolutions',
  imports: [NgFor, PokemonCardComponent],
  templateUrl: './pokemon-evolutions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonEvolutionsComponent implements OnInit, OnDestroy {
  pokemonId = input.required<number>();
  evolutions = signal<SimplePokemon[]>([]);

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.loadEvolutions();
  }

  private loadEvolutions() {
    this.pokemonService
      .getPokemonEvolutions(this.pokemonId())
      .subscribe((simplePokemons) => {
        this.evolutions.set(simplePokemons);
      });
  }

  ngOnDestroy(): void {}
}
