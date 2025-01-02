import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
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

  status = signal({
    draft: false,
    pending: false,
    paid: false,
  });

  selectedStatuses = computed(() => {
    return Object.entries(this.status())
      .filter(([_, isSelected]) => isSelected)
      .map(([status]) => status);
  });

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

  onFormChange() {
    this.store.dispatch(
      invoiceActions.filterInvoices({ statuses: this.selectedStatuses() })
    );
  }
}
