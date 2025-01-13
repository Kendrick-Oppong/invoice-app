import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BadgeComponent } from '@components/badge/badge.component';
import { TextComponent } from '@components/text/text.component';
import { ButtonComponent } from '@components/button/button.component';
import { HeadlineComponent } from '@components/headline/headline.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectInvoices } from '@app/store/reducers';
import { Invoice } from '@interfaces/index';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';
import { TitleCasePipe, LowerCasePipe, CommonModule } from '@angular/common';
import { DialogComponent } from '@components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { invoiceActions } from '@app/store/actions';
import { FormComponent } from '@components/form/form.component';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    BadgeComponent,
    TextComponent,
    ButtonComponent,
    HeadlineComponent,
    IconComponent,
    RouterLink,
    TitleCasePipe,
    LowerCasePipe,
    DialogComponent,
    FormComponent,
  ],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit {
  readonly icons = ICONS;
  private readonly store: Store = inject(Store);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  invoiceId: string | null = '';
  invoiceDetail: Invoice | undefined = undefined;
  invoices$: Observable<Invoice[]> = this.store.select(selectInvoices);
  showDialogue = signal<boolean>(false);
  showDialog() {
    this.showDialogue.set(true);
  }
  toggleAddInvoiceForm() {
    this.store.dispatch(invoiceActions.showAddInvoiceForm());
  }

  markAsPaid() {
    if (this.invoiceId) {
      this.store.dispatch(
        invoiceActions.markInvoiceAsPaid({ id: this.invoiceId })
      );
    }
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    if (!this.invoiceId) {
      return;
    }
    this.store.dispatch(invoiceActions.loadInvoices());

    this.invoices$.subscribe((invoices) => {
      this.invoiceDetail = invoices.find(
        (invoice) => invoice.id === this.invoiceId
      );
    });
  }
}
