import { Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() onClick: () => void = () => {};
  @Input() type: 'button' | 'submit' = 'button';
}
