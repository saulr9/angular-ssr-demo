import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [NgFor, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data) => {
      data.results.forEach((pokemon) => {
        this.pokemonService.getPokemonByName(pokemon.name).subscribe((data) => {
          this.pokemons.push(data);
        });
      });
    });
  }
}
