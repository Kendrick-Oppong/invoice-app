import { Routes } from '@angular/router';
import { LayoutComponent } from '@components/layout/layout.component';
import { InvoicesComponent } from '@pages/invoices/invoices.component';
import { InvoiceDetailComponent } from '@pages/invoice-detail/invoice-detail.component';
import { SignInComponent } from '@components/sign-in/sign-in.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { UnauthorizedComponent } from '@pages/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
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
      {
        path: 'invoices/:id',
        component: InvoiceDetailComponent,
      },
    ],
  },
  {
    path: '401',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
