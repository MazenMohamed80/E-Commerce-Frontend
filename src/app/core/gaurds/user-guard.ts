import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
export const userGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.checkIfLoginWithRole() === 'user') return true;
  router.navigate(['/login']);
  return false;
};
