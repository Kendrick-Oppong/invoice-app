import { Component, input } from '@angular/core';
import { BadgeStatus } from '@interfaces/index';
import { HeadlineComponent } from '@components/headline/headline.component';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [HeadlineComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  readonly status = input<BadgeStatus>('draft');
}
