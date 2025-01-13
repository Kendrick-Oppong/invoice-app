import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, delay } from 'rxjs';
import { invoiceActions } from '@app/store/actions';
import { InvoicesService } from '@app/services/invoices/invoices.service';

@Injectable()
export class InvoiceEffects {
  private actions$: Actions = inject(Actions);
  private invoicesService = inject(InvoicesService);

  // Effect to load invoices
  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.loadInvoices),
      switchMap(() =>
        this.invoicesService.getInvoices().pipe(
          delay(1000),
          map((invoices) => {
            if (invoices.length === 0) {
              throw new Error('No invoices available');
            }
            return invoiceActions.loadInvoicesSuccess({ invoices });
          }),
          catchError((error) =>
            of(
              invoiceActions.loadInvoicesFailure({
                error: error.message || 'Something went wrong',
              })
            )
          )
        )
      )
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
