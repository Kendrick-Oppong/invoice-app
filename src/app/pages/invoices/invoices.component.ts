import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invoiceActions } from '@app/store/actions';
import {
  selectFilteredInvoices,
  selectLoading,
  selectError,
} from '@app/store/reducers';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '@components/header/header.component';
import { InvoiceCardComponent } from '@components/invoice-card/invoice-card.component';
import { IconComponent } from '@components/icon/icon.component';
import { ICONS } from '@constants/index';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextComponent } from '@components/text/text.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    HeaderComponent,
    InvoiceCardComponent,
    IconComponent,
    HeadlineComponent,
    TextComponent,
    TextFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly fb = inject(FormBuilder);
  icons = ICONS;
  invoices = this.store.selectSignal(selectFilteredInvoices);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);

  invoiceForm = this.fb.group({
    createdAt: [''],
    paymentDue: [''],
    description: [''],
    paymentTerms: ['Net 30 Days'],
    clientName: [''],
    clientEmail: [''],
    status: ['pending'],

    senderStreet: [''],
    senderCity: [''],
    senderPostCode: [''],
    senderCountry: [''],

    clientStreet: [''],
    clientCity: [''],
    clientPostCode: [''],
    clientCountry: [''],

    itemName: [''],
    itemQuantity: [0],
    itemPrice: [0],
    itemTotal: [0],

    total: [0],
  });

  ngOnInit(): void {
    this.store.dispatch(invoiceActions.loadInvoices());
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.value);
    }
  }
}
