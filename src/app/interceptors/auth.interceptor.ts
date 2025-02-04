import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/services/localstorage/local-storage.service';
import { NotificationService } from '@app/services/notification/notification.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authToken = localStorageService.getItem<string>('authToken');

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          localStorageService.removeItem('authToken');
          notificationService.showInfo('Session expired. Please sign in again.');
          router.navigate(['/401']);
        }
        return throwError(() => new Error(error.error));
      })
    );
  }

  return next(req);
};

