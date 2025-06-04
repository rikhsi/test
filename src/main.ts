import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@core/configs';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
