import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { selectShowAddInvoiceForm } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeadlineComponent } from '@components/headline/headline.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { TextComponent } from '@components/text/text.component';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';
import { DropdownComponent } from '@components/dropdown/dropdown.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    HeadlineComponent,
    TextFieldComponent,
    TextComponent,
    IconComponent,
    CommonModule,
    DatePickerComponent,
    DropdownComponent
],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private readonly store: Store = inject(Store);
  private readonly fb = inject(FormBuilder);
  isShowAddInvoiceForm = this.store.selectSignal(selectShowAddInvoiceForm);
  icons = ICONS;
  isFormSubmitted = false;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Get field error state to style input border
  isFieldError(field: string): boolean {
    const control = this.invoiceForm.get(field);
    return ((control?.invalid && control?.touched) ||
      this.isFormSubmitted) as boolean;
  }

  // Method to retrieve error messages for each field
  // getErrorMessage(field: string): string {
  //   const control = this.invoiceForm.get(field);

  //   if (control?.hasError('required')) {
  //     return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
  //   }
  //   if (control?.hasError('minlength')) {
  //     const minLength = control.getError('minlength').requiredLength;
  //     return `${
  //       field.charAt(0).toUpperCase() + field.slice(1)
  //     } must be at least ${minLength} characters long.`;
  //   }
  //   if (control?.hasError('email')) {
  //     return 'Enter a valid email address.';
  //   }
  //   if (control?.hasError('pattern')) {
  //     if (field === 'phone') {
  //       return 'Phone number must be 10 digits long.';
  //     }
  //   }
  //   return '';
  // }

  // onSubmit() {
  // Mark all form controls as touched so that validation is triggered
  // Object.keys(this.invoiceForm.controls).forEach((control) => {
  //   const controlInstance = this.invoiceForm.get(control);
  //   if (controlInstance) {
  //     controlInstance.markAsTouched();
  //     controlInstance.updateValueAndValidity();
  //   }
  // });

  // Check if the form is valid before proceeding
  //   if (this.invoiceForm.valid) {
  //     console.log(this.invoiceForm.value)
  //     // Proceed with form submission logic
  //   } else {
  //     // Handle form submission error
  //     console.log('Form is invalid');
  //   }
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.invoiceForm.valid) {
  //     console.log('InvoiceForm Submitted:', this.invoiceForm.value);
  //   }
  // }

  invoiceForm = this.fb.group({
    createdAt: ['', [Validators.required, Validators.min(2)]],
    // paymentDue: ['', [Validators.required, Validators.min(2)]],
    description: ['', [Validators.required, Validators.min(2)]],
    paymentTerms: ['', [Validators.required, Validators.min(1)]],
    clientName: ['', [Validators.required, Validators.min(2)]],
    clientEmail: [
      '',
      [Validators.required, Validators.pattern(this.emailPattern)],
    ],
    status: ['pending'],

    senderStreet: ['', [Validators.required, Validators.min(2)]],
    senderCity: ['', [Validators.required, Validators.min(2)]],
    senderPostCode: ['', [Validators.required, Validators.min(2)]],
    senderCountry: ['', [Validators.required, Validators.min(2)]],

    clientStreet: ['', [Validators.required, Validators.min(2)]],
    clientCity: ['', [Validators.required, Validators.min(2)]],
    clientPostCode: ['', [Validators.required, Validators.min(2)]],
    clientCountry: ['', [Validators.required, Validators.min(2)]],

    itemName: ['', [Validators.required, Validators.min(2)]],
    itemQuantity: [1, [Validators.required, Validators.min(1)]],
    itemPrice: [1, [Validators.required, Validators.min(1)]],
    itemTotal: [1],

    total: [0],
  });

  onSubmit() {
    this.isFormSubmitted = true;
    Object.keys(this.invoiceForm.controls).forEach((control) => {
      const controlInstance = this.invoiceForm.get(control);
      if (controlInstance) {
        controlInstance.markAsTouched();
        controlInstance.updateValueAndValidity();
      }
    });

    
      console.log(this.invoiceForm.value)
      // Proceed with form submission logic
    
  }
}
