import { Component, Input, forwardRef, OnInit, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  imports: [FormsModule, CommonModule]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() autocomplete: boolean = false;
  @Input() name: string = '';
  @Input() pattern: string = '';
  @Input() ngClass: any = {};

  isTouched: boolean = false;
  isInvalid: boolean = false;
  isSubmitted: boolean = false;
  private _value: any = '';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  ngOnInit(): void {

  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
      this.isInvalid = false;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);

    if (this.required) {
      this.isInvalid = !value;
    }
  }

  onBlur(): void {
    this.isTouched = true;
    this.onTouched();
    this.validateField();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {

    if (event.key === 'Tab' || event.key === 'Enter') {
      this.validateField();
    }
  }

  setFormSubmitted(isSubmitted: boolean): void {
    this.isSubmitted = isSubmitted;
    this.validateField();
  }

  private validateField(): void {

    if (this.isTouched || this.isSubmitted) {
      if (this.required) {
        this.isInvalid = !this._value;
      }
    }
  }
}
