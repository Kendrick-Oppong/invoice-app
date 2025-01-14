import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '@interfaces/index';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private readonly baseUrl = '../../../assets/data/data.json';
  private invoices: Invoice[] = [];
  constructor(private readonly http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl);
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    this.invoices.push(invoice);
    return of(invoice);
  }

  deleteInvoice(id: string): Observable<void> {
    this.invoices = this.invoices.filter((item) => item.id !== id);
    return of();
  }
  // updateInvoice(id: string, invoice: Invoice): Observable<Invoice> {
    
  // }

  createInvoice(invoiceForm: FormGroup): Invoice {
    const createdAt = invoiceForm.get('createdAt')?.value;
    if (!createdAt) throw new Error('Created date is required');

    const createdAtDate = new Date(createdAt);
    const formattedCreatedAt = createdAtDate.toISOString().split('T')[0];

    // Map the items array from the form
    const itemsArray = invoiceForm.get('items') as FormArray;
    const items = itemsArray.controls.map((control) => ({
      name: control.get('name')?.value,
      quantity: control.get('quantity')?.value,
      price: control.get('price')?.value,
      total: control.get('total')?.value,
    }));

    const invoice: Invoice = {
      id: this.generateId(),
      createdAt: formattedCreatedAt,
      paymentDue: this.calculatePaymentDue(
        invoiceForm.get('paymentTerms')?.value || 'Net 30 Days'
      ),
      description: invoiceForm.get('description')?.value || '',
      paymentTerms: invoiceForm.get('paymentTerms')?.value || 'Net 30 Days',
      clientName: invoiceForm.get('clientName')?.value || '',
      clientEmail: invoiceForm.get('clientEmail')?.value || '',
      status: invoiceForm.get('status')?.value || 'pending',
      senderAddress: {
        street: invoiceForm.get('senderStreet')?.value || '',
        city: invoiceForm.get('senderCity')?.value || '',
        postCode: invoiceForm.get('senderPostCode')?.value || '',
        country: invoiceForm.get('senderCountry')?.value || '',
      },
      clientAddress: {
        street: invoiceForm.get('clientStreet')?.value || '',
        city: invoiceForm.get('clientCity')?.value || '',
        postCode: invoiceForm.get('clientPostCode')?.value || '',
        country: invoiceForm.get('clientCountry')?.value || '',
      },
      items: items,
      total: invoiceForm.get('total')?.value || 0,
    };

    return invoice;
  }

  private generateId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');

    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();

    return `${randomLetters}${randomDigits}`;
  }

  private calculatePaymentDue(paymentTerms: string): string {
    const match = paymentTerms.match(/Net (\d+) Days/);
    if (!match) {
      throw new Error('Invalid payment terms format');
    }

    const daysToAdd = parseInt(match[1], 10); // Get the number of days from the match

    const paymentDate = new Date();

    if (isNaN(paymentDate.getTime())) {
      throw new Error('Invalid Date');
    }

    paymentDate.setDate(paymentDate.getDate() + daysToAdd); // Add the number of days to the current date

    const year = paymentDate.getFullYear();
    const month = (paymentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = paymentDate.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }
}
