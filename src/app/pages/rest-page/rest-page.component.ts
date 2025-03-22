import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PokemonListComponent } from '../../features/pokemons/components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-rest-page',
  imports: [PokemonListComponent],
  templateUrl: './rest-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RestPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('REST Page');
    this.meta.addTag({
      name: 'description',
      content: 'This is the REST page.',
    });
    this.meta.addTag({
      name: 'keywords',
      content: 'rest, pokédex, pokémon',
    });
  }
}
