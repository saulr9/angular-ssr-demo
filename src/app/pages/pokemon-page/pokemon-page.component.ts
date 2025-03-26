import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { PokemonDetailComponent } from '../../features/pokemons/components/pokemon-detail/pokemon-detail.component';
import { Pokemon } from '../../features/pokemons/interfaces/pokemon';
import { PokemonService } from '../../features/pokemons/services/pokemon.service';
import { SeoService } from '../../features/pokemons/services/seo.service';

@Component({
  selector: 'app-pokemon-page',
  imports: [PokemonDetailComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  public pokemon = signal<Pokemon | null>(null);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getPokemonByName();
    });
  }

  private getPokemonByName() {
    const pokemonName = this.route.snapshot.paramMap.get('name');

    this.pokemonService
      .getPokemonByName(pokemonName!)
      .pipe(
        catchError((error) => {
          console.error('Error fetching Pokémon by name:', error);
          this.router.navigate(['/']);
          return of(null);
        }),
        tap((pokemon) => {
          if (pokemon) {
            this.seoService.setPokemonMetaTags(pokemon);
          }
        })
      )
      .subscribe((pokemon) => {
        if (pokemon) {
          this.pokemon.set(pokemon);
        }
      });
  }
}
