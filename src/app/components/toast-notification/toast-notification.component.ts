import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '@app/services/notification/notification.service';
import { Store } from '@ngrx/store';
import { selectNotificationState } from '@app/store/reducers';
import { Observable, tap } from 'rxjs';
import { NotificationState } from '@interfaces/index';
import { HeadlineComponent } from '../headline/headline.component';


@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule, HeadlineComponent],
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css'],
})
export class ToastNotificationComponent {
  private readonly store: Store = inject(Store);
  private readonly notificationService: NotificationService =
    inject(NotificationService);

  notification$: Observable<NotificationState> = this.store
    .select(selectNotificationState)
    .pipe(
      tap((notification) => {
        if (notification.show) {
          setTimeout(() => {
            this.notificationService.clearNotification();
          }, 3000);
        }
      })
    );
}
