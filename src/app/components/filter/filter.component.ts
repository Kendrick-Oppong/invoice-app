import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICONS } from '@constants/index';
import { HeadlineComponent } from '@components/headline/headline.component';
import { IconComponent } from '@components/icon/icon.component';
import { Store } from '@ngrx/store';
import { invoiceActions } from '@app/store/actions';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, HeadlineComponent, IconComponent],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  readonly icon = ICONS;
  showFilter = false;
  private readonly store: Store = inject(Store);

  status = {
    draft: false,
    pending: false,
    paid: false,
  };


  @ViewChild('filterForm', { static: false }) filterForm!: ElementRef;

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.showFilter &&
      this.filterForm &&
      !this.filterForm.nativeElement.contains(event.target)
    ) {
      this.showFilter = false;
    }
  }

  selectedStatuses() {
    const statuses: string[] = [];
    if (this.status.draft) statuses.push('draft');
    if (this.status.pending) statuses.push('pending');
    if (this.status.paid) statuses.push('paid');
    return statuses;
  }

  onFormChange() {
    this.store.dispatch(
      invoiceActions.filterInvoices({ statuses: this.selectedStatuses() })
    );
  }
}
