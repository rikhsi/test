import { Route } from '@angular/router';
import { RouteForms } from '@constants';
import { requirementResolver } from './pages/vacancy/resolvers/requirement.resolver';
import {
  VacancyResourseService,
  VacancyService,
} from './pages/vacancy/services';

export const routes: Route[] = [
  {
    path: RouteForms.RESUME,
    loadComponent: () =>
      import('./pages/resume/resume.component').then((c) => c.ResumeComponent),
  },
  {
    path: RouteForms.VACANCY,
    providers: [VacancyResourseService, VacancyService],
    resolve: { requirements: requirementResolver },
    loadComponent: () =>
      import('./pages/vacancy/vacancy.component').then(
        (c) => c.VacancyComponent
      ),
  },
];
