import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req, next) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    const clone = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next(clone);
  }
  else {
    return next(req);
  }
};
