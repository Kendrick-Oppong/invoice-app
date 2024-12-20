import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent {
  @Input() name = 'line';
  
}
