import { Routes } from '@angular/router';
import { RouteBase } from '@constants';

export const routes: Routes = [
  {
    path: RouteBase.MAIN,
    loadComponent: () =>
      import('@pages/main/main.component').then((c) => c.MainComponent),
  },
  {
    path: RouteBase.RESUME,
    loadComponent: () =>
      import('@pages/resume/resume.component').then((c) => c.ResumeComponent),
  },
  {
    path: RouteBase.VACANCY,
    loadComponent: () =>
      import('@pages/vacancy/vacancy.component').then(
        (c) => c.VacancyComponent
      ),
  },
];
