import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';  // Importando MatDialogModule para testes
import { EditPersonModalComponent } from './../../components/modal-edit/edit-person-modal.component'; // Corrigido: Importando o componente real

describe('EditPersonModalComponent', () => {
  let component: EditPersonModalComponent;
  let fixture: ComponentFixture<EditPersonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPersonModalComponent],  // Corrigido: Componente deve estar em `declarations`
      imports: [MatDialogModule]  // Corrigido: Necessário importar MatDialogModule para utilizar MatDialog no teste
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
