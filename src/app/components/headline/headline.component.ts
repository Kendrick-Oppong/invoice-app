import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { Headline } from '@interfaces/index';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent {
  readonly variant = input<Headline>(undefined);
}
