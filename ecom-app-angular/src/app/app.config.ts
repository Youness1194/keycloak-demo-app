import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AutoRefreshTokenService,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  UserActivityService,
  createInterceptorCondition,
  includeBearerTokenInterceptor,
  provideKeycloak,
  withAutoRefreshToken,
} from 'keycloak-angular';
import { routes } from './app.routes';

const apiCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^http:\/\/localhost:(8087|8088)(\/.*)?$/i,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'glsid3-realm',
        clientId: 'ecom-client-ang',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      },
      features: [withAutoRefreshToken({ onInactivityTimeout: 'logout', sessionTimeout: 300000 })],
      providers: [AutoRefreshTokenService, UserActivityService],
    }),
    { provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, useValue: [apiCondition] },
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
  ],
};
