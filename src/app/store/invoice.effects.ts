import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, delay } from 'rxjs';
import { invoiceActions } from '@app/store/actions';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { LocalStorageService } from '@app/services/localstorage/local-storage.service';
import { BadgeStatus, Invoice } from '@interfaces/index';
import { Store } from '@ngrx/store';
import { NotificationService } from '@app/services/notification/notification.service';

@Injectable()
export class InvoiceEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly invoicesService: InvoicesService = inject(InvoicesService);
  private readonly store: Store = inject(Store);
  private readonly localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private readonly notificationService: NotificationService =
    inject(NotificationService);

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
  // addInvoice$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(invoiceActions.addInvoice),
  //     switchMap(({ invoice }) =>
  //       this.invoicesService.addInvoice(invoice).pipe(
  //         delay(1000),
  //         map((newInvoice) => {
  //           // Add the new invoice to localStorage after successful addition
  //           const updatedInvoices = [
  //             ...(this.localStorageService.getItem<Invoice[]>('invoices') ||
  //               []),
  //             newInvoice,
  //           ];
  //           this.localStorageService.setItem('invoices', updatedInvoices);

  //           // Dispatch success action
  //           this.store.dispatch(
  //             invoiceActions.addInvoiceSuccess({ invoice: newInvoice })
  //           );

  //           // Dispatch the loadInvoices action to refetch the invoices
  //           this.store.dispatch(invoiceActions.loadInvoices());

  //           return invoiceActions.addInvoiceSuccess({ invoice: newInvoice });
  //         }),
  //         catchError((error) =>
  //           of(invoiceActions.addInvoiceFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );
  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.addInvoice),
      switchMap(({ invoice }) =>
        this.invoicesService.addInvoice(invoice).pipe(
          delay(1000),
          map((newInvoice) => {
            const updatedInvoices = [
              newInvoice,
              ...(this.localStorageService.getItem<Invoice[]>('invoices') ||
                []),
            ];
            this.localStorageService.setItem('invoices', updatedInvoices);

            // Dispatch success action and notification
            this.store.dispatch(
              invoiceActions.addInvoiceSuccess({ invoice: newInvoice })
            );
            this.notificationService.showSuccess('Invoice added successfully');

            //hide form
            this.store.dispatch(invoiceActions.showAddInvoiceForm());

            // Dispatch loadInvoices action to refresh the list
            return invoiceActions.loadInvoices();
          }),
          catchError((error) => {
            this.notificationService.showError('Failed to add invoice');
            return of(
              invoiceActions.addInvoiceFailure({ error: error.message })
            );
          })
        )
      )
    )
  );
  // Effect to update an invoice
  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.updateInvoice),
      switchMap(({ id, invoice }) =>
        of(void 0).pipe(
          delay(1000),
          map(() => {
            const invoices =
              this.localStorageService.getItem<Invoice[]>('invoices') || [];

            const updatedInvoices = invoices.map((item) =>
              item.id === id ? { ...item, ...invoice } : item
            );

            this.localStorageService.setItem('invoices', updatedInvoices);

            this.notificationService.showSuccess('Invoice updated successfully');

            // Dispatch loadInvoices action to refresh the list
            this.store.dispatch(invoiceActions.loadInvoices());

            this.store.dispatch(invoiceActions.showAddInvoiceForm());
            return invoiceActions.updateInvoiceSuccess({ invoice });
          }),
          catchError((error) => {
            this.notificationService.showError('Failed to update invoice');
            return of(
              invoiceActions.updateInvoiceFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.deleteInvoice),
      switchMap(({ id }) =>
        of(void 0).pipe(
          delay(1000),
          map(() => {
            const currentInvoices =
              this.localStorageService.getItem<Invoice[]>('invoices') || [];
            const updatedInvoices = currentInvoices.filter(
              (invoice) => invoice.id !== id
            );
            this.localStorageService.setItem('invoices', updatedInvoices);

            this.notificationService.showSuccess(
              'Invoice deleted successfully'
            );

            return invoiceActions.deleteInvoiceSuccess({ id });
          }),
          catchError((error) => {
            this.notificationService.showError('Failed to delete invoice');
            return of(
              invoiceActions.deleteInvoiceFailure({
                error: error.message || 'Failed to delete invoice',
              })
            );
          })
        )
      )
    )
  );

  markInvoiceAsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.markInvoiceAsPaid),
      map(({ id }) => {
        const invoices =
          this.localStorageService.getItem<Invoice[]>('invoices') || [];
        const updatedInvoices = invoices.map((invoice) =>
          invoice.id === id
            ? { ...invoice, status: 'paid' as BadgeStatus }
            : invoice
        );
        this.localStorageService.setItem('invoices', updatedInvoices);
        this.notificationService.showSuccess('Invoice marked as paid');
        const updatedInvoice = updatedInvoices.find(
          (invoice) => invoice.id === id
        );
        if (!updatedInvoice) {
          throw new Error('Updated invoice not found');
        }
        return invoiceActions.updateInvoiceSuccess({ invoice: updatedInvoice });
      }),
      catchError((error) => {
        this.notificationService.showError('Failed to mark invoice as paid');
        return of(
          invoiceActions.updateInvoiceFailure({ error: error.message })
        );
      })
    )
  );
}
