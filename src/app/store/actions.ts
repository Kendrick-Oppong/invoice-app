import { BadgeStatus, Invoice } from '@interfaces/index';
import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const invoiceActions = createActionGroup({
  source: 'Invoices',
  events: {
    'Sign In': props<{ username: string; password: string }>(),
    'Sign In Success': props<{ token: string }>(),
    'Sign In Failure': props<{ error: string }>(),

    'Add Invoice': props<{ invoice: Invoice }>(),
    'Add Invoice Success': props<{ invoice: Invoice }>(),
    'Add Invoice Failure': props<{ error: string }>(),

    'Load Invoice Details': props<{ invoiceId: string }>(),
    'Load Invoice Details Success': props<{ invoice: Invoice }>(),
    'Load Invoice Details Failure': props<{ error: string }>(),

    'Update Invoice': props<{ id: string; invoice: Invoice }>(),
    'Update Invoice Success': props<{ invoice: Invoice }>(),
    'Update Invoice Failure': props<{ error: string }>(),

    'Delete Invoice': props<{ id: string }>(),
    'Delete Invoice Success': props<{ message: string }>(),
    'Delete Invoice Failure': props<{ error: string }>(),

    'Load Invoices': emptyProps(),
    'Load Invoices Success': props<{ invoices: Invoice[] }>(),
    'Load Invoices Failure': props<{ error: string }>(),

    'Filter Invoices': props<{ statuses: string[] }>(),
    'Show Add Invoice Form': emptyProps(),

    'Mark Invoice As Paid': props< { id: string; status: BadgeStatus; invoice: Invoice }>(),
    'Mark Invoice As Paid Success': props<{ message: string }>(),
    'Mark Invoice As Paid Failure': props<{ error: string }>(),
  },
});

export const themeActions = createActionGroup({
  source: 'Theme',
  events: {
    'Toggle Theme': emptyProps(),
  },
});

export const notificationActions = createActionGroup({
  source: 'Notification',
  events: {
    'Show Notification': props<{
      message: string;
      toastType: 'success' | 'error' | 'info';
    }>(),
    'Clear Notification': emptyProps(),
  },
});
