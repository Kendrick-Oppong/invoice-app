import { Component } from '@angular/core';

import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css',
})
export class InvoicesComponent {}
