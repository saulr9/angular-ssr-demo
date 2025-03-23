import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  /*   {
    path: 'rest',
    loadComponent: () => import('./pages/rest-page/rest-page.component'),
  },
  {
    path: 'graphql',
    loadComponent: () => import('./pages/graphql-page/graphql-page.component'),
  }, */
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page.component'),
  },
  {
    path: '**',
    redirectTo: 'pokemons/page/1',
  },
];
