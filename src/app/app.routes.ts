import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page.component'),
  },
  {
    path: '**',
    redirectTo: 'pokemons/page/1',
  },
];
