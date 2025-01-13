import { createFeature, createReducer, on } from '@ngrx/store';
import { InvoiceState } from '@interfaces/index';
import { invoiceActions } from './actions';
import { produce } from 'immer';

export const initialState: InvoiceState = {
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
        draft.invoices.push(invoice);
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
