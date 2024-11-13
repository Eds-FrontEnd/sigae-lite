import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import { MatIcon } from '@angular/material/icon';
import { MenubarComponent } from "../../components/menubar/menubar.component";
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { DynamicButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { RegistrationData } from './../../models/interface/registration/registration-info';

@Component({
  selector: 'app-registration-data',
  templateUrl: './registration-data.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./registration-data.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MenubarComponent,
    TimelineComponent,
    DynamicButtonComponent,
    MatIcon,
    InputComponent
  ]
})
export class RegistrationDataComponent implements OnInit {
  registrationForm: FormGroup;
  escolas: string[] = ['Municipal', 'Estadual', 'Particular'];

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      socialName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cpf: ['', [Validators.required, this.cpfValidator]],
      cnpj: ['', [Validators.required, this.cnpjValidator]],
      school: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const savedData = this.localStorageService.getItem<RegistrationData>('registrationData');
    if (savedData && savedData.completed) {
      this.registrationForm.reset();
    }
  }

  cpfValidator: ValidatorFn = (control: AbstractControl) => {
    const cpf = control.value;
    const cpfPattern = /^[0-9]{11}$/;
    return cpf && !cpfPattern.test(cpf) ? { invalidCpf: true } : null;
  };

  cnpjValidator: ValidatorFn = (control: AbstractControl) => {
    const cnpj = control.value;
    const cnpjPattern = /^[0-9]{14}$/;
    return cnpj && !cnpjPattern.test(cnpj) ? { invalidCnpj: true } : null;
  };

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const newId = Date.now().toString();
      const formData: RegistrationData = {
        id: newId,
        ...this.registrationForm.value,
        completed: false,
      };

      this.localStorageService.setItem('registrationData', formData);

      this.router.navigate(['/registration-contact']);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.registrationForm.get(controlName);
    return control?.hasError(errorCode) && (control?.touched || control?.dirty) || false;
  }
}
