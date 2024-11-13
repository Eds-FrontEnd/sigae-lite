import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando CommonModule

@Component({
  selector: 'app-timeline',
  standalone: true,  // Marca o componente como standalone
  imports: [CommonModule],  // Adicionando CommonModule ao array de imports
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  @Input() active: number = 1;

  // Array contendo as etapas da timeline
  etapas: string[] = [
    'Dados Cadastrais',
    'Dados de Contato',
    'Dados Finais'
  ];
}
