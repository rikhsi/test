import { Route } from '@angular/router';
import { RouteForms } from '@constants';

export const routes: Route[] = [
  {
    path: RouteForms.RESUME,
    loadComponent: () =>
      import('./pages/resume/resume.component').then((c) => c.ResumeComponent),
  },
  {
    path: RouteForms.VACANCY,
    loadComponent: () =>
      import('./pages/vacancy/vacancy.component').then(
        (c) => c.VacancyComponent
      ),
  },
];
