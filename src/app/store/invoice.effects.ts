import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, delay } from 'rxjs';
import { invoiceActions } from '@app/store/actions';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { LocalStorageService } from '@app/services/localstorage/local-storage.service';
import { Invoice } from '@interfaces/index';

@Injectable()
export class InvoiceEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly invoicesService: InvoicesService = inject(InvoicesService);
  private readonly localStorageService: LocalStorageService =
    inject(LocalStorageService);

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.loadInvoices),
      switchMap(() => {
        // Check if invoices are already present in the store or localStorage
        const invoicesFromStorage =
          this.localStorageService.getItem<Invoice[]>('invoices');
        const invoicesInitialized = this.localStorageService.getItem<boolean>(
          'invoicesInitialized'
        );

        // If there are invoices in storage and the flag is set, don't fetch
        if (invoicesFromStorage && invoicesInitialized) {
          return of(
            invoiceActions.loadInvoicesSuccess({
              invoices: invoicesFromStorage,
            })
          );
        }

        // If not initialized, fetch from the JSON file
        return this.invoicesService.getInvoices().pipe(
          delay(1000),
          map((invoices) => {
            if (invoices.length === 0) {
              throw new Error('No invoices available');
            }
            // Store the fetched invoices and set the initialization flag
            this.localStorageService.setItem('invoices', invoices);
            this.localStorageService.setItem('invoicesInitialized', true);

            return invoiceActions.loadInvoicesSuccess({ invoices });
          }),
          catchError((error) =>
            of(
              invoiceActions.loadInvoicesFailure({
                error: error.message || 'Something went wrong',
              })
            )
          )
        );
      })
    )
  );

  // Effect to add an invoice
  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.addInvoice),
      switchMap(({ invoice }) =>
        this.invoicesService.addInvoice(invoice).pipe(
          delay(1000),
          map((newInvoice) =>
            invoiceActions.addInvoiceSuccess({ invoice: newInvoice })
          ),
          catchError((error) =>
            of(invoiceActions.addInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Effect to update an invoice
  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.updateInvoice),
      switchMap(({ id, invoice }) =>
        this.invoicesService.updateInvoice(id, invoice).pipe(
          delay(1000),
          map((updatedInvoice) =>
            invoiceActions.updateInvoiceSuccess({ invoice: updatedInvoice })
          ),
          catchError((error) =>
            of(invoiceActions.updateInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Effect to delete an invoice
  deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.deleteInvoice),
      switchMap(({ id }) =>
        this.invoicesService.deleteInvoice(id).pipe(
          delay(1000),
          map(() => invoiceActions.deleteInvoiceSuccess({ id })),
          catchError((error) =>
            of(invoiceActions.deleteInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
