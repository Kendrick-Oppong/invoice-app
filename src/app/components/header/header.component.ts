import { Component, inject } from '@angular/core';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextComponent } from '@components/text/text.component';
import { FilterComponent } from '@components/filter/filter.component';
import { ButtonComponent } from '@components/button/button.component';
import { Store } from '@ngrx/store';
import { selectFilteredInvoices } from '@app/store/reducers';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';
import { invoiceActions } from '@app/store/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeadlineComponent,
    TextComponent,
    FilterComponent,
    ButtonComponent,
    IconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly store: Store = inject(Store);
  readonly icons = ICONS;
  readonly invoices = this.store.selectSignal(selectFilteredInvoices);

  toggleAddInvoiceForm() {
    this.store.dispatch(invoiceActions.showAddInvoiceForm());
  }
}
