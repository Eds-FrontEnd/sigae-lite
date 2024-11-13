import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';  // Certificando-se de que CommonModule está presente
import { DynamicButtonComponent } from '../../components/button/button.component';
import { MenubarComponent } from '../../components/menubar/menubar.component';
import { RegistrationData } from './../../models/interface/registration/registration-info';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonModalComponent } from './../../components/modal-edit/edit-person-modal.component'; // Modal de edição
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-persons',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MenubarComponent,
    DynamicButtonComponent,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  currentButtonText: string = 'Adicionar';
  personsList: RegistrationData[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const allRegistrations = this.localStorageService.getItem<RegistrationData[]>('allRegistrations');
    if (allRegistrations && Array.isArray(allRegistrations)) {
      this.personsList = allRegistrations;
    } else {
      this.personsList = [];
    }

      this.titleService.setTitle('Persons');

  }

  addPerson(): void {
    this.router.navigate(['/registration-data']);
  }

  // Função para editar a pessoa (abre o modal de edição)
  editPerson(id: string): void {
    const person = this.personsList.find(p => p.id === id);
    if (person) {
      const dialogRef = this.dialog.open(EditPersonModalComponent, {
        width: '600px',
        data: { person }  // Passando os dados da pessoa para o modal
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.updatePersonInList(result);  // Atualiza os dados na lista de pessoas
        }
      });
    }
  }

  // Atualiza a pessoa na lista depois de editar
  updatePersonInList(updatedPerson: RegistrationData): void {
    const updatedPersonsList = this.personsList.map(person =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    this.localStorageService.setItem('allRegistrations', updatedPersonsList);
    this.personsList = updatedPersonsList;  // Atualiza a lista no componente
  }

  confirmDelete(id: string): void {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePerson(id);
      }
    });
  }

  deletePerson(id: string): void {
    const updatedPersonsList = this.personsList.filter(person => person.id !== id);
    this.localStorageService.setItem('allRegistrations', updatedPersonsList);
    this.personsList = updatedPersonsList;
    Swal.fire({
      title: 'Cadastro excluído!',
      text: 'A pessoa foi removida com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
