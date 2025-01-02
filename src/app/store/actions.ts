import { Invoice } from '@interfaces/index';
import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const invoiceActions = createActionGroup({
  source: 'Invoices',
  events: {
    'Add Invoice': props<{ invoice: Invoice }>(),
    'Add Invoice Success': props<{ invoice: Invoice }>(),
    'Add Invoice Failure': props<{ error: string }>(),

    'Update Invoice': props<{ id: string; invoice: Invoice }>(),
    'Update Invoice Success': props<{ invoice: Invoice }>(),
    'Update Invoice Failure': props<{ error: string }>(),

    'Delete Invoice': props<{ id: string }>(),
    'Delete Invoice Success': props<{ id: string }>(),
    'Delete Invoice Failure': props<{ error: string }>(),

    'Load Invoices': emptyProps(),
    'Load Invoices Success': props<{ invoices: Invoice[] }>(),
    'Load Invoices Failure': props<{ error: string }>(),

    'Filter Invoices': props<{ statuses: string[] }>(),
  },
});
