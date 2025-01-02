import { Component, input } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';
import { ICONS } from '@constants/index';
import { HeadlineComponent } from '@components/headline/headline.component';
import { ButtonType } from '@interfaces/index';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IconComponent, HeadlineComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  readonly icons = ICONS;
  variant = input.required<ButtonType>();
}
