import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistrationData } from './../../models/interface/registration/registration-info';
import { MatDialogModule } from '@angular/material/dialog';  // Importando MatDialogModule
import { MatFormFieldModule } from '@angular/material/form-field';  // Importando MatFormFieldModule
import { MatInputModule } from '@angular/material/input';  // Necessário para usar o input no mat-form-field
import { MatSelectModule } from '@angular/material/select'; // Importando MatSelectModule para o select
import { FormsModule } from '@angular/forms';  // Importando FormsModule
import { DynamicButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-edit-person-modal',
  templateUrl: './edit-person-modal.component.html',
  styleUrls: ['./edit-person-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    DynamicButtonComponent,
  ]
})
export class EditPersonModalComponent {
  person: RegistrationData;

  constructor(
    public dialogRef: MatDialogRef<EditPersonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { person: RegistrationData }
  ) {
    this.person = { ...data.person };  // Copia os dados da pessoa para edição
  }

  // Método para fechar o modal sem salvar alterações
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Método para salvar as alterações e fechar o modal
  saveChanges(): void {
    this.dialogRef.close(this.person);
  }
}
