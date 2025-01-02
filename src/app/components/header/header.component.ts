import { Component, inject } from '@angular/core';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextComponent } from '@components/text/text.component';
import { FilterComponent } from '@components/filter/filter.component';
import { ButtonComponent } from '@components/button/button.component';
import { Store } from '@ngrx/store';
import { selectInvoices } from '@app/store/reducers';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeadlineComponent, TextComponent, FilterComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private store: Store = inject(Store);
  readonly invoices = this.store.selectSignal(selectInvoices);
}
