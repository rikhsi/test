import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    url: `mock/${req.url}`,
  });

  return next(modifiedReq);
};
