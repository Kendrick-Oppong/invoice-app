import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '@app/services/localstorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    const token = this.localStorageService.getItem<string>('authToken');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
