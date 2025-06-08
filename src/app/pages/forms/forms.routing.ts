import { Route } from '@angular/router';
import { RouteForms } from '@constants';
import { requirementResolver } from './pages/vacancy/resolvers/requirement.resolver';
import {
  VacancyResourseService,
  VacancyFormService,
} from './pages/vacancy/services';
import { regionResolver } from './pages/vacancy/resolvers';

export const routes: Route[] = [
  {
    path: RouteForms.RESUME,
    loadComponent: () =>
      import('./pages/resume/resume.component').then((c) => c.ResumeComponent),
  },
  {
    path: RouteForms.VACANCY,
    providers: [VacancyResourseService, VacancyFormService],
    resolve: { requirements: requirementResolver, regions: regionResolver },
    loadComponent: () =>
      import('./pages/vacancy/vacancy.component').then(
        (c) => c.VacancyComponent
      ),
  },
];
