import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly keycloak = inject(Keycloak);

  protected readonly authenticated = this.keycloak.authenticated ?? false;
  protected readonly username = this.keycloak.tokenParsed?.['preferred_username'] as
    string | undefined;
  protected readonly isAdmin = this.keycloak.hasRealmRole('ADMIN');

  protected login() {
    this.keycloak.login({ redirectUri: window.location.origin });
  }

  protected logout() {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
