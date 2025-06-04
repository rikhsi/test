import { Routes } from '@angular/router';
import { RouteBase } from '@constants';
import { FormLayoutComponent, MainLayoutComponent } from '@layouts/views';

export const routes: Routes = [
  {
    path: RouteBase.MAIN,
    component: MainLayoutComponent,
    loadChildren: () =>
      import('@pages/main/main.routing').then((r) => r.routes),
  },
  {
    path: RouteBase.FORMS,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('@pages/forms/forms.routing').then((r) => r.routes),
  },
  {
    path: '**',
    redirectTo: RouteBase.MAIN,
  },
];
