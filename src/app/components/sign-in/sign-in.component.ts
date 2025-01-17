import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { invoiceActions } from '@app/store/actions';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextFieldComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  signInForm = this.fb.group({
    email: [
      'kendrick.oppong@amalitech.com',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern),
      ],
    ],
    password: ['T[<?\\+DyKk~+', [Validators.required, Validators.min(2)]],
  });
  onSubmit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    // alert('Form submitted successfully');
    this.store.dispatch(
      invoiceActions.signIn({
        username: email!,
        password: password!,
      })
    );
  }
}
