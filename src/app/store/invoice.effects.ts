import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { invoiceActions } from '@app/store/actions';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { LocalStorageService } from '@app/services/localstorage/local-storage.service';
import { NotificationService } from '@app/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class InvoiceEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly store: Store = inject(Store);
  private readonly invoicesService: InvoicesService = inject(InvoicesService);
  private readonly localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private readonly notificationService: NotificationService =
    inject(NotificationService);

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.signIn),
      switchMap(({ username, password }) =>
        this.invoicesService.signIn({ username, password }).pipe(
          map(({ token }) => {
            this.localStorageService.setItem('authToken', token);
            this.notificationService.showSuccess('Sign In Successful');
            this.router.navigate(['/invoices']);
            return invoiceActions.signInSuccess({ token });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage = error.error || 'Invalid Credentials';
            this.notificationService.showError(errorMessage);
            return of(invoiceActions.signInFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.loadInvoices),
      switchMap(() =>
        this.invoicesService.getInvoices().pipe(
          map((invoices) => {
            this.notificationService.showSuccess(
              'Invoices loaded successfully'
            );
            return invoiceActions.loadInvoicesSuccess({ invoices });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage = error.error || 'Failed to load invoices';
            this.notificationService.showError(errorMessage);
            return of(
              invoiceActions.loadInvoicesFailure({ error: errorMessage })
            );
          })
        )
      )
    )
  );

  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.addInvoice),
      switchMap(({ invoice }) =>
        this.invoicesService.addInvoice({ invoice }).pipe(
          map((addedInvoice) => {
            const successMessage = 'Invoice added successfully';
            this.notificationService.showSuccess(successMessage);
            this.store.dispatch(invoiceActions.showAddInvoiceForm());
            setTimeout(() => {
              this.router.navigate(['/invoices']);
            }, 2000);
            this.store.dispatch(invoiceActions.loadInvoices());
            return invoiceActions.addInvoiceSuccess({ invoice: addedInvoice });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage = error.error || 'Failed to add invoice';
            this.notificationService.showError(errorMessage);
            return of(
              invoiceActions.addInvoiceFailure({ error: errorMessage })
            );
          })
        )
      )
    )
  );

  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.updateInvoice),
      switchMap(({ id, invoice }) =>
        this.invoicesService.updateInvoice({ id, invoice }).pipe(
          map((updatedInvoice) => {
            const successMessage = 'Invoice updated successfully';
            this.notificationService.showSuccess(successMessage);
            this.router.navigate(['/invoices']);
            this.store.dispatch(invoiceActions.showAddInvoiceForm());
            return invoiceActions.updateInvoiceSuccess({
              invoice: updatedInvoice,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage = error.error || 'Failed to update invoice';
            this.notificationService.showError(errorMessage);
            return of(
              invoiceActions.updateInvoiceFailure({ error: errorMessage })
            );
          })
        )
      )
    )
  );

  invoiceDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoiceActions.loadInvoiceDetails),
      switchMap(({ invoiceId }) =>
        this.invoicesService.getInvoiceById({ invoiceId }).pipe(
          map((loadedInvoice) => {
            this.notificationService.showSuccess('Invoice loaded successfully');
            return invoiceActions.loadInvoiceDetailsSuccess({
              invoice: loadedInvoice,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage =
              error.error || 'Failed to load invoice details';
            this.notificationService.showError(errorMessage);
            return of(
              invoiceActions.loadInvoiceDetailsFailure({ error: errorMessage })
            );
          })
        )
      )
    )
  );
  deleteInvoice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invoiceActions.deleteInvoice),
      switchMap(({ id }) =>
        this.invoicesService.deleteInvoice({ id }).pipe(
          map(() => {
            const successMessage = 'Invoice deleted successfully';
            this.notificationService.showSuccess(successMessage);
            this.router.navigate(['/invoices']);
            return invoiceActions.deleteInvoiceSuccess({
              message: successMessage,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage = error.error || 'Failed to delete invoice';
            this.notificationService.showError(errorMessage);
            return of(
              invoiceActions.deleteInvoiceFailure({ error: errorMessage })
            );
          })
        )
      )
    );
  });

  MarkAsPaid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invoiceActions.markInvoiceAsPaid),
      switchMap(({ id, invoice, status }) =>
        this.invoicesService.markAsPaid({ id, invoice, status }).pipe(
          map((invoice) => {
            const successMessage = 'Invoice marked as paid successfully';
            this.notificationService.showSuccess(successMessage);
            invoiceActions.loadInvoiceDetailsSuccess({ invoice });
            return invoiceActions.markInvoiceAsPaidSuccess({
              message: successMessage,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage =
              error.error || 'Failed to mark invoice as paid';
            this.notificationService.showError(errorMessage);
            return of(
              invoiceActions.markInvoiceAsPaidFailure({ error: errorMessage })
            );
          })
        )
      )
    );
  });
}
