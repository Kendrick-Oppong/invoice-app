import { Component } from '@angular/core';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextComponent } from '@components/text/text.component';
import { FilterComponent } from '@components/filter/filter.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeadlineComponent, TextComponent, FilterComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
