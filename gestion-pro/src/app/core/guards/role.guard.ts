import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = route.data?.['roles'] as string[] | undefined;
  const userRole = auth.role();
  if (!roles || roles.includes(userRole || '')) {
    return true;
  }
  return router.createUrlTree(['/records']);
};
