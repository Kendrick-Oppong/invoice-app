import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICONS } from '@constants/index';
import { HeadlineComponent } from '@components/headline/headline.component';
import { IconComponent } from '@components/icon/icon.component';

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

  onFormChange() {}
}
