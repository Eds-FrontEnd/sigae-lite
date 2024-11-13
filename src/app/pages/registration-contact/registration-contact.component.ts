import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import { MenubarComponent } from "../../components/menubar/menubar.component";
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { DynamicButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { RegistrationData } from './../../models/interface/registration/registration-info';

@Component({
  selector: 'app-registration-contact',
  templateUrl: './registration-contact.component.html',
  styleUrls: ['./registration-contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MenubarComponent, TimelineComponent, DynamicButtonComponent, MatIcon, RouterModule, InputComponent]
})
export class RegistrationContactComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService) {
    this.registrationForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhones: this.fb.array([this.createPhone(true)]),
    });
  }

  ngOnInit(): void {
    const savedData = this.localStorageService.getItem<RegistrationData>('registrationData');
    if (savedData && savedData.completed) {
      this.registrationForm.reset();
    }
  }

  createPhone(isFirst: boolean = false): FormGroup {
    return this.fb.group({
      contactPhone: ['', isFirst ? [Validators.required] : []], // Removendo minLength e maxLength
    });
  }

  addPhone(phoneValue: string = ''): void {
    const phone = this.createPhone();
    if (phoneValue) {
      phone.patchValue({ contactPhone: phoneValue });
    }
    this.contactPhones.push(phone);
  }

  removePhone(index: number): void {
    if (this.contactPhones.length > 1) {
      this.contactPhones.removeAt(index);
    }
  }

  get contactPhones() {
    return (this.registrationForm.get('contactPhones') as FormArray);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const newId = Date.now().toString();
      const savedData = this.localStorageService.getItem<RegistrationData>('registrationData');
      const formData: RegistrationData = {
        id: newId,
        ...savedData,
        ...this.registrationForm.value,
        completed: false,
      };

      this.localStorageService.setItem('registrationData', formData);
      this.router.navigate(['/registration-address']);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.registrationForm.get(controlName);
    return control?.hasError(errorCode) && (control?.touched || control?.dirty) || false;
  }
}
