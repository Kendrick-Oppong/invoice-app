import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { TextVariant } from '@interfaces/index';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css',
})
export class TextComponent {
  readonly variant = input<TextVariant>();
}
