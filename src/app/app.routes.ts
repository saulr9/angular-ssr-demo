import { Routes } from '@angular/router';
import PokemonPageComponent from './pages/pokemon-page/pokemon-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons/page/1',
    pathMatch: 'full',
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  {
    path: 'pokemon/:name',
    component: PokemonPageComponent,
  },
  {
    path: '**',
    redirectTo: 'pokemons/page/1',
  },
];
