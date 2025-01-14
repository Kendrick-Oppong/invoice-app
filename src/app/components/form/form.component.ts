import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { selectShowAddInvoiceForm } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { TextComponent } from '@components/text/text.component';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { invoiceActions } from '@app/store/actions';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { Invoice } from '@interfaces/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    HeadlineComponent,
    TextFieldComponent,
    TextComponent,
    IconComponent,
    CommonModule,
    DatePickerComponent,
    DropdownComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly fb = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly invoicesService: InvoicesService = inject(InvoicesService);
  isShowAddInvoiceForm = this.store.selectSignal(selectShowAddInvoiceForm);
  icons = ICONS;
  @Input() invoiceDetail: Invoice | undefined;
  isFormSubmitted = false;

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  invoiceForm = this.fb.group({
    createdAt: ['', [Validators.required, Validators.min(2)]],
    description: ['', [Validators.required, Validators.min(2)]],
    paymentTerms: ['', [Validators.required, Validators.min(1)]],
    clientName: ['', [Validators.required, Validators.min(2)]],
    clientEmail: [
      '',
      [Validators.required, Validators.pattern(this.emailPattern)],
    ],
    status: ['pending'],
    senderStreet: ['', [Validators.required, Validators.min(2)]],
    senderCity: ['', [Validators.required, Validators.min(2)]],
    senderPostCode: ['', [Validators.required, Validators.min(2)]],
    senderCountry: ['', [Validators.required, Validators.min(2)]],
    clientStreet: ['', [Validators.required, Validators.min(2)]],
    clientCity: ['', [Validators.required, Validators.min(2)]],
    clientPostCode: ['', [Validators.required, Validators.min(2)]],
    clientCountry: ['', [Validators.required, Validators.min(2)]],
    items: this.fb.array([this.createItem()]),
    total: [0],
  });

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  ngOnInit(): void {
    if (this.invoiceDetail) {
      this.loadInvoiceDetail(this.invoiceDetail);
    }
  }
  saveAsDraft() {
    this.invoiceForm.patchValue({ status: 'draft' });
    this.onSubmit();
  }
  createItem() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.min(2)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      total: [0],
    });
  }

  addNewItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  calculateItemTotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = quantity * price;
    item.patchValue({ total });
    this.updateInvoiceTotal();
  }

  updateInvoiceTotal() {
    const total = this.items.controls.reduce((sum, item) => {
      return sum + (item.get('total')?.value || 0);
    }, 0);
    this.invoiceForm.patchValue({ total });
  }

  isFieldError(field: string): boolean {
    const control = this.invoiceForm.get(field);
    return (control?.invalid && control?.touched) || this.isFormSubmitted;
  }

  toggleAddInvoiceForm(): void {
    this.store.dispatch(invoiceActions.showAddInvoiceForm());
  }

  onSubmit() {
    this.isFormSubmitted = true;
    Object.keys(this.invoiceForm.controls).forEach((control) => {
      const controlInstance = this.invoiceForm.get(control);
      if (controlInstance) {
        controlInstance.markAsTouched();
        controlInstance.updateValueAndValidity();
      }
    });
    if (this.invoiceForm.valid) {
      const newInvoice = this.invoicesService.createInvoice(this.invoiceForm);
      if (this.invoiceDetail) {
        this.store.dispatch(
          invoiceActions.updateInvoice({
            id: this.invoiceDetail.id,
            invoice: newInvoice,
          })
        );
        setTimeout(() => {
          this.router.navigate(['/invoices']);
        }, 2000);
      } else {
        this.invoicesService.addInvoice(newInvoice).subscribe((invoice) => {
          this.store.dispatch(invoiceActions.addInvoice({ invoice }));
        });
      }
    }
  }

  loadInvoiceDetail(invoiceDetail: Invoice): void {
    this.invoiceForm.patchValue({
      senderStreet: invoiceDetail.senderAddress.street,
      senderCity: invoiceDetail.senderAddress.city,
      senderPostCode: invoiceDetail.senderAddress.postCode,
      senderCountry: invoiceDetail.senderAddress.country,
      clientName: invoiceDetail.clientName,
      clientEmail: invoiceDetail.clientEmail,
      clientStreet: invoiceDetail.clientAddress.street,
      clientCity: invoiceDetail.clientAddress.city,
      clientPostCode: invoiceDetail.clientAddress.postCode,
      clientCountry: invoiceDetail.clientAddress.country,
      createdAt: invoiceDetail.createdAt,
      paymentTerms: invoiceDetail.paymentTerms.toString(),
      description: invoiceDetail.description,
      total: invoiceDetail.total,
    });

    this.items.clear();
    invoiceDetail.items.forEach((item: any) => {
      this.items.push(
        this.fb.group({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })
      );
    });
  }
}
