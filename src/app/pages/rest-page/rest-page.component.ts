import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rest-page',
  imports: [],
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
