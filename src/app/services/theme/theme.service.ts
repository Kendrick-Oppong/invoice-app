import { inject, Injectable } from '@angular/core';
import { themeActions } from '@app/store/actions';
import { selectIsDarkTheme } from '@app/store/reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly store: Store = inject(Store);
  theme$ = this.store.select(selectIsDarkTheme);

  constructor() {
    this.theme$.subscribe((isDarkTheme) => {
      document.documentElement.setAttribute(
        'data-theme',
        isDarkTheme ? 'dark' : 'light'
      );
    });
  }

  toggleTheme() {
    this.store.dispatch(themeActions.toggleTheme());
  }
}
