import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { routes } from '../../app.routes';
import { ru_RU, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { ngZorroConfig } from './nz.config';
import { progressInterceptor } from '@core/interceptors';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

registerLocaleData(ru);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideNzI18n(ru_RU),
    provideNzConfig(ngZorroConfig),
    provideEnvironmentNgxMask(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([progressInterceptor, apiInterceptor])),
    importProvidersFrom(
      AngularYandexMapsModule.forRoot({
        apikey: 'd306c0df-8591-4784-ae3e-23323936fbd4',
        lang: 'ru_RU',
      })
    ),
  ],
};
