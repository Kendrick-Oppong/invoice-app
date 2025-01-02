import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invoiceActions } from '@app/store/actions';
import {
  selectFilteredInvoices,
  selectLoading,
  selectError,
} from '@app/store/reducers';

import { HeaderComponent } from '@components/header/header.component';
import { InvoiceCardComponent } from '@components/invoice-card/invoice-card.component';
import { IconComponent } from '@components/icon/icon.component';
import { ICONS } from '@constants/index';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextComponent } from '@components/text/text.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    HeaderComponent,
    InvoiceCardComponent,
    IconComponent,
    HeadlineComponent,
    TextComponent,
  ],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  private readonly store: Store = inject(Store);
  icons = ICONS;
  invoices = this.store.selectSignal(selectFilteredInvoices);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);

  ngOnInit(): void {
    this.store.dispatch(invoiceActions.loadInvoices());
  }
}
