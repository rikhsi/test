import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProgressService } from '@core/services';
import { finalize } from 'rxjs';

export const progressInterceptor: HttpInterceptorFn = (req, next) => {
  const progress = inject(ProgressService);

  progress.progressState.set(true);

  return next(req).pipe(finalize(() => progress.progressState.set(false)));
};
