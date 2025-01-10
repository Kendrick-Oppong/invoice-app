// import { Component, forwardRef, input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ICONS } from '@constants/index';
// import { IconComponent } from '../icon/icon.component';
// import { FieldProps } from '@interfaces/index';
// import { ControlContainer, FormGroupDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-date-picker',
//   standalone: true,
//   imports: [CommonModule, IconComponent, ReactiveFormsModule],
//   templateUrl: './date-picker.component.html',
//   styleUrls: ['./date-picker.component.css'],
//   viewProviders: [
//     {
//       provide: ControlContainer,
//       useExisting: FormGroupDirective,
//     },
//   ],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => DatePickerComponent),
//       multi: true,
//     },
//   ],
// })
// export class DatePickerComponent {
//   isDatePickerOpen = false;
//   selectedDate: Date = new Date();
//   currentMonth: Date = new Date();
//   icons = ICONS;
//   readonly fieldProps = input.required<FieldProps>();
//   readonly controlName = input.required<string>();

//   daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

//   get calendarDates(): Date[] {
//     const dates: Date[] = [];
//     const startOfMonth = new Date(
//       this.currentMonth.getFullYear(),
//       this.currentMonth.getMonth(),
//       1
//     );
//     const endOfMonth = new Date(
//       this.currentMonth.getFullYear(),
//       this.currentMonth.getMonth() + 1,
//       0
//     );
//     const startDate = new Date(startOfMonth);
//     startDate.setDate(startOfMonth.getDate() - startOfMonth.getDay());

//     while (startDate <= endOfMonth || startDate.getDay() !== 0) {
//       dates.push(new Date(startDate));
//       startDate.setDate(startDate.getDate() + 1);
//     }

//     return dates;
//   }

//   toggleDatePicker(): void {
//     this.isDatePickerOpen = !this.isDatePickerOpen;
//   }

//   selectDate(date: Date): void {
//     this.selectedDate = date;
//     this.isDatePickerOpen = false;
//   }

//   isSelectedDate(date: Date): boolean {
//     return (
//       date.getDate() === this.selectedDate.getDate() &&
//       date.getMonth() === this.selectedDate.getMonth() &&
//       date.getFullYear() === this.selectedDate.getFullYear()
//     );
//   }

//   isDisabled(date: Date): boolean {
//     return date.getMonth() !== this.currentMonth.getMonth();
//   }

//   previousMonth(): void {
//     this.currentMonth = new Date(
//       this.currentMonth.getFullYear(),
//       this.currentMonth.getMonth() - 1,
//       1
//     );
//   }

//   nextMonth(): void {
//     this.currentMonth = new Date(
//       this.currentMonth.getFullYear(),
//       this.currentMonth.getMonth() + 1,
//       1
//     );
//   }
// }
import { Component, input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICONS } from '@constants/index';
import { IconComponent } from '../icon/icon.component';
import { FieldProps } from '@interfaces/index';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, IconComponent, ReactiveFormsModule, FormsModule, ButtonComponent],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  isDatePickerOpen = false;
  selectedDate: Date = new Date();
  currentMonth: Date = new Date();
  icons = ICONS;
  readonly fieldProps = input.required<FieldProps>();
  readonly controlName = input.required<string>();
  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  get calendarDates(): Date[] {
    const dates: Date[] = [];
    const startOfMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    );
    const startDate = new Date(startOfMonth);
    startDate.setDate(startOfMonth.getDate() - startOfMonth.getDay());

    while (startDate <= endOfMonth || startDate.getDay() !== 0) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedDate = new Date(value);
    } else {
      this.selectedDate = new Date();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementation not needed for this case
  }

  toggleDatePicker(): void {
    this.isDatePickerOpen = !this.isDatePickerOpen;
    this.onTouched();
  }

  selectDate(date: Date): void {
    this.selectedDate = new Date(date);
    this.isDatePickerOpen = false;
    this.onChange(this.selectedDate.toISOString());
    this.onTouched();
  }

  isSelectedDate(date: Date): boolean {
    if (!this.selectedDate || !date) return false;
    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  isDisabled(date: Date): boolean {
    return date.getMonth() !== this.currentMonth.getMonth();
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
  }
}