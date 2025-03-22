import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SimplePokemon } from '../../interfaces/pokemons';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [NgIf, NgFor, PokemonCardComponent, PaginationComponent],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit {
  pokemons = signal<SimplePokemon[]>([]);
  totalPages = signal<number>(0);

  title = inject(Title);

  pokemonService = inject(PokemonService);

  private route = inject(ActivatedRoute);
  router = inject(Router);

  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => {
        return params.get('page') ?? 1;
      }),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  ngOnInit(): void {
    this.getPokemons(this.currentPage());
  }

  getPokemons(page: number = 0) {
    this.pokemonService.getPokemons(page).subscribe((pokemons) => {
      this.totalPages.set(pokemons.totalPages);
      this.pokemons.set(pokemons.results);
    });
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
    this.title.setTitle(`Pokemons - Page ${page}`);
    this.getPokemons(page);
  }
}
