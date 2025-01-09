import { Component, inject } from '@angular/core';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';
import { ThemeService } from '@app/services/theme/theme.service';
import { selectIsDarkTheme } from '@app/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  private readonly themeService: ThemeService = inject(ThemeService);
  private readonly store: Store = inject(Store);
  readonly iconData = ICONS;
  isDarkMode = this.store.selectSignal(selectIsDarkTheme);

  // Toggle theme on button click
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
