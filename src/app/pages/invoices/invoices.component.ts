import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invoiceActions } from '@app/store/actions';
import {
  selectFilteredInvoices,
  selectLoading,
  selectError,
} from '@app/store/reducers';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  icons = ICONS;
  invoices = this.store.selectSignal(selectFilteredInvoices);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);

  invoiceForm = new FormGroup({
    fromStreet: new FormControl(''),
    fromCity: new FormControl(''),
    fromPostCode: new FormControl(''),
    fromCountry: new FormControl(''),
    clientName: new FormControl(''),
    clientEmail: new FormControl(''),
    streetAddress: new FormControl(''),
    city: new FormControl(''),
    postCode: new FormControl(''),
    country: new FormControl(''),
    invoiceDate: new FormControl(''),
    paymentTerms: new FormControl('Net 30 Days'),
    projectDescription: new FormControl(''),
    itemName: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
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
