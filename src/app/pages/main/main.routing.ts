import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./main.component').then((c) => c.MainComponent),
  },
];
