import { Component, inject, Input, model } from '@angular/core';
import { Router } from '@angular/router';

import { invoiceActions } from '@app/store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  @Input({ required: true }) invoiceId: string | undefined | null = '';
  showDialoguePopup = model<boolean>();
  showDialog() {
    this.showDialoguePopup.update((val) => !val);
  }

  deleteInvoice() {
    if (this.invoiceId) {
      this.store.dispatch(invoiceActions.deleteInvoice({ id: this.invoiceId }));
    }
  }
}
