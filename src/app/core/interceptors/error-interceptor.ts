import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      const rawMessage = error?.error?.message ?? error?.error?.error;

      const message =
        typeof rawMessage === 'string'
          ? rawMessage
          : rawMessage?.message || 'Something went wrong.';

      if (error.status === 403 && error?.error?.code === 'ACCOUNT_BLOCKED') {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');

        notifications.error(message);
        router.navigate(['/login']);
      } else if (error.status >= 400) {
        notifications.error(message);
      }

      return throwError(() => error);
    }),
  );
};
