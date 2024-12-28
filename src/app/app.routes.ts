import { Routes } from '@angular/router';
import { LayoutComponent } from '@components/layout/layout.component';
import { InvoicesComponent } from '@pages/invoices/invoices.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'invoices',
        pathMatch: 'full',
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
    ],
  },
];
