import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  imports: [],
  standalone: true,
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  /*   private platformId = inject(PLATFORM_ID); */

  ngOnInit() {
    this.title.setTitle('Home Page');
    this.meta.addTag({
      name: 'description',
      content: 'This is the home page.',
    });
    this.meta.addTag({
      name: 'keywords',
      content: 'home, pokédex, pokémon',
    });
  }
}
