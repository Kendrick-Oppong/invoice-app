import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '@interfaces/index';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private readonly baseUrl = '../../../assets/data/data.json';
  private readonly invoices: Invoice[] = [];
  constructor(private readonly http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl);
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    this.invoices.push(invoice);
    return of(invoice);
  }

  updateInvoice(id: string, invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.baseUrl}/update/${id}`, invoice);
  }

  deleteInvoice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  createInvoice(invoiceForm: FormGroup): Invoice {
    const createdAt = invoiceForm.get('createdAt')!.value;

    const createdAtDate = new Date(createdAt);
    const formattedCreatedAt = createdAtDate.toISOString().split('T')[0]; 

    const invoice: Invoice = {
      id: this.generateId(),
      createdAt: formattedCreatedAt,
      paymentDue: this.calculatePaymentDue(
        invoiceForm.get('paymentTerms')!.value
      ),
      description: invoiceForm.get('description')!.value,
      paymentTerms: invoiceForm.get('paymentTerms')!.value,
      clientName: invoiceForm.get('clientName')!.value,
      clientEmail: invoiceForm.get('clientEmail')!.value,
      status: invoiceForm.get('status')!.value,
      senderAddress: {
        street: invoiceForm.get('senderStreet')!.value,
        city: invoiceForm.get('senderCity')!.value,
        postCode: invoiceForm.get('senderPostCode')!.value,
        country: invoiceForm.get('senderCountry')!.value,
      },
      clientAddress: {
        street: invoiceForm.get('clientStreet')!.value,
        city: invoiceForm.get('clientCity')!.value,
        postCode: invoiceForm.get('clientPostCode')!.value,
        country: invoiceForm.get('clientCountry')!.value,
      },
      items: [
        {
          name: invoiceForm.get('itemName')!.value,
          quantity: invoiceForm.get('itemQuantity')!.value,
          price: invoiceForm.get('itemPrice')!.value,
          total: invoiceForm.get('itemTotal')!.value,
        },
      ],
      total: invoiceForm.get('total')!.value,
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
    const month = (paymentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = paymentDate.getDate().toString().padStart(2, '0'); // Add leading zero if needed

    return `${year}-${month}-${day}`;
  }
}
