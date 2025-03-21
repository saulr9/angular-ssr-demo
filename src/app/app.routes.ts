import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  {
    path: 'rest',
    loadComponent: () => import('./pages/rest-page/rest-page.component'),
  },
  {
    path: 'graphql',
    loadComponent: () => import('./pages/graphql-page/graphql-page.component'),
  },
];
