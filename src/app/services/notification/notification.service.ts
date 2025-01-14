// notification.service.ts
import { Injectable } from '@angular/core';
import { notificationActions } from '@app/store/actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly store: Store) {}

  showSuccess(message: string): void {
    this.store.dispatch(
      notificationActions.showNotification({ message, toastType: 'success' })
    );
  }

  showError(message: string): void {
    this.store.dispatch(
      notificationActions.showNotification({ message, toastType: 'error' })
    );
  }

  showInfo(message: string): void {
    this.store.dispatch(
      notificationActions.showNotification({ message, toastType: 'info' })
    );
  }

  clearNotification(): void {
    this.store.dispatch(notificationActions.clearNotification());
  }
}
