import { createFeature, createReducer, on } from '@ngrx/store';
import { InvoiceState, NotificationState } from '@interfaces/index';
import { invoiceActions, notificationActions, themeActions } from './actions';
import { produce } from 'immer';

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
  filteredInvoices: [],
  showAddInvoiceForm: false,
};

export const InvoiceFeature = createFeature({
  name: 'Invoices',
  reducer: createReducer(
    initialState,
    // Load Invoices
    on(invoiceActions.loadInvoices, (state) =>
      produce(state, (draft) => {
        draft.loading = true;
        draft.error = null;
      })
    ),
    on(invoiceActions.loadInvoicesSuccess, (state, { invoices }) =>
      produce(state, (draft) => {
        draft.invoices = invoices;
        draft.filteredInvoices = invoices;
        draft.loading = false;
      })
    ),
    on(invoiceActions.loadInvoicesFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.loading = false;
      })
    ),

    on(invoiceActions.addInvoice, (state) =>
      produce(state, (draft) => {
        draft.loading = true;
        draft.error = null;
      })
    ),
    on(invoiceActions.addInvoiceSuccess, (state, { invoice }) =>
      produce(state, (draft) => {
        draft.invoices.unshift(invoice);
        draft.loading = false;
      })
    ),
    on(invoiceActions.addInvoiceFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.loading = false;
      })
    ),

    on(invoiceActions.updateInvoice, (state) =>
      produce(state, (draft) => {
        draft.loading = true;
        draft.error = null;
      })
    ),
    on(invoiceActions.updateInvoiceSuccess, (state, { invoice }) =>
      produce(state, (draft) => {
        const index = draft.invoices.findIndex(
          (item) => item.id === invoice.id
        );
        if (index !== -1) {
          draft.invoices[index] = invoice;
        }
          draft.loading = false;
      })
    ),
    on(invoiceActions.updateInvoiceFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.loading = false;
      })
    ),

    on(invoiceActions.deleteInvoice, (state) =>
      produce(state, (draft) => {
        draft.loading = true;
        draft.error = null;
      })
    ),
    on(invoiceActions.deleteInvoiceSuccess, (state, { id }) =>
      produce(state, (draft) => {
        draft.invoices = draft.invoices.filter((item) => item.id !== id);
        draft.filteredInvoices = draft.filteredInvoices.filter(
          (item) => item.id !== id
        );
        draft.loading = false;
      })
    ),
    on(invoiceActions.deleteInvoiceFailure, (state, { error }) =>
      produce(state, (draft) => {
        draft.error = error;
        draft.loading = false;
      })
    ),
    on(invoiceActions.filterInvoices, (state, { statuses }) =>
      produce(state, (draft) => {
        if (statuses.length === 0) {
          draft.filteredInvoices = draft.invoices;
        } else {
          draft.filteredInvoices = draft.invoices.filter((invoice) =>
            statuses.includes(invoice.status)
          );
        }
      })
    ),
    on(invoiceActions.showAddInvoiceForm, (state) =>
      produce(state, (draft) => {
        draft.showAddInvoiceForm = !draft.showAddInvoiceForm;
      })
    ),
    on(invoiceActions.markInvoiceAsPaid, (state, { id }) =>
      produce(state, (draft) => {
        const index = draft.invoices.findIndex((invoice) => invoice.id === id);
        if (index !== -1) {
          draft.invoices[index].status = 'paid';
        }
        draft.loading = false;
      })
    )
  ),
});

export const {
  selectInvoices,
  selectLoading,
  selectError,
  selectFilteredInvoices,
  selectShowAddInvoiceForm,
} = InvoiceFeature;

const themeState: { isDarkTheme: boolean } = {
  isDarkTheme: false,
};

export const themeFeature = createFeature({
  name: 'theme',
  reducer: createReducer(
    themeState,
    on(themeActions.toggleTheme, (state) =>
      produce(state, (draft) => {
        draft.isDarkTheme = !draft.isDarkTheme;
      })
    )
  ),
});

export const { selectIsDarkTheme } = themeFeature;

const initialNotificationState: NotificationState = {
  message: '',
  toastType: null,
  show: false,
};

export const notificationFeature = createFeature({
  name: 'notification',
  reducer: createReducer(
    initialNotificationState,
    on(notificationActions.showNotification, (state, { message, toastType }) =>
      produce(state, (draft) => {
        draft.message = message;
        draft.toastType = toastType;
        draft.show = true;
      })
    ),

    on(notificationActions.clearNotification, (state) =>
      produce(state, (draft) => {
        draft.message = '';
        draft.toastType = null;
        draft.show = false;
      })
    )
  ),
});

export const {
  selectMessage,
  selectShow,
  selectNotificationState,
  selectToastType,
} = notificationFeature;
