import { ERoute } from './enums/routes';
import { IRoute } from './interfaces/route';

export const menuRoutes: IRoute[] = [
  { displayName: ERoute.pokemons, path: 'pokemons/page/1' },
  { displayName: ERoute.caughtPokemons, path: 'caught-pokemons' },
];
