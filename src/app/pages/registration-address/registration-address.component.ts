import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenubarComponent } from "../../components/menubar/menubar.component";
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { DynamicButtonComponent } from '../../components/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { InputComponent } from '../../components/input/input.component';
import { RegistrationData } from './../../models/interface/registration/registration-info';
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-address',
  templateUrl: './registration-address.component.html',
  styleUrls: ['./registration-address.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MenubarComponent, TimelineComponent, DynamicButtonComponent, MatIcon, InputComponent, RouterModule]
})
export class RegistrationAddressComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService) {
    this.registrationForm = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const savedData = this.localStorageService.getItem<RegistrationData>('registrationData');
    if (savedData && savedData.completed) {
      this.registrationForm.reset();
    } else if (savedData) {
      this.registrationForm.patchValue(savedData);
    }
  }

  cepValidator: ValidatorFn = (control: AbstractControl) => {
    const cep = control.value;
    const cepPattern = /^[0-9]{5}-[0-9]{3}$/;
    return cep && !cepPattern.test(cep) ? { invalidCep: true } : null;
  };

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const savedData = this.localStorageService.getItem<RegistrationData>('registrationData');
      const newId = Date.now().toString();
      const formData: RegistrationData = {
        id: newId,
        ...savedData,
        ...this.registrationForm.value,
        completed: true,
      };

      let allRegistrations: RegistrationData[] = this.localStorageService.getItem('allRegistrations') || [];
      allRegistrations.push(formData);
      this.localStorageService.setItem('allRegistrations', allRegistrations);

      Swal.fire({
        title: 'Cadastro Completo!',
        text: 'Seu cadastro foi realizado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/persons']);
      });
    } else {
      this.registrationForm.markAllAsTouched();
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos corretamente.',
        icon: 'error',
        confirmButtonText: 'Tentar novamente'
      });
    }
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.registrationForm.get(controlName);
    return control?.hasError(errorCode) && (control?.touched || control?.dirty) || false;
  }
}
