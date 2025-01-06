import { Component, input } from '@angular/core';
import { FieldProps } from '@interfaces/index';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css',
})
export class TextFieldComponent {
  readonly fieldProps = input.required<FieldProps>();
  readonly controlName = input.required<string>();
}
