import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData,
): Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const { authenticated, grantedRoles, keycloak } = authData;

  if (!authenticated) {
    await keycloak.login({ redirectUri: window.location.origin + state.url });
    return false;
  }

  const requiredRole: string | undefined = route.data['role'];
  if (!requiredRole || grantedRoles.realmRoles.includes(requiredRole)) {
    return true;
  }
  return router.parseUrl('/');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
