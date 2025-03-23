import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(
    tags: { name?: string; property?: string; content: string }[]
  ) {
    tags.forEach((tag) => this.meta.updateTag(tag));
  }

  setPokemonMetaTags(pokemon: { name: string; id: number }) {
    this.updateTitle(`Pokemon - ${pokemon.name}`);
    this.updateMetaTags([
      { name: 'description', content: pokemon.name },
      { name: 'keywords', content: pokemon.name },
      { property: 'og:title', content: pokemon.name },
      { property: 'og:description', content: pokemon.name },
      {
        property: 'og:image',
        content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      },
    ]);
  }
}
