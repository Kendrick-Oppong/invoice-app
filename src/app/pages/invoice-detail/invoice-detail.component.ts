import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BadgeComponent } from '@components/badge/badge.component';
import { TextComponent } from '@components/text/text.component';
import { ButtonComponent } from '@components/button/button.component';
import { HeadlineComponent } from '@components/headline/headline.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectInvoices } from '@app/store/reducers';
import { Invoice } from '@interfaces/index';
import { invoiceActions } from '@app/store/actions';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [
    BadgeComponent,
    TextComponent,
    ButtonComponent,
    HeadlineComponent,
    IconComponent,
    RouterLink,
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

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    if (!this.invoiceId) {
      return;
    }

    this.invoices$.subscribe((invoices) => {
      this.invoiceDetail = invoices.find(
        (invoice) => invoice.id === this.invoiceId
      );
    });
  }
}
