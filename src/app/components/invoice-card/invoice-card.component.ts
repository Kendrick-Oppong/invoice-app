import { Component, input } from '@angular/core';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextComponent } from '@components/text/text.component';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';
import { BadgeComponent } from '@components/badge/badge.component';
import { Invoice } from '@interfaces/index';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [
    HeadlineComponent,
    TextComponent,
    IconComponent,
    BadgeComponent,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.css',
})
export class InvoiceCardComponent {
  readonly icon = ICONS;
  readonly invoice = input.required<Invoice>();
}
