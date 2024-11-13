import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],  // Se não houver dependências externas, pode manter vazio ou importar módulos necessários
  templateUrl: './button.component.html',  // Refere-se ao template HTML
  styleUrls: ['./button.component.scss']  // Refere-se ao arquivo de estilo CSS
})
export class DynamicButtonComponent {
  @Input() buttonText: string = '';  // Texto do botão
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';  // Tipo do botão (padrão é 'button')
  @Input() titleText: string = '';  // Texto alternativo para acessibilidade
  @Input() href: string | null = null;  // URL para o redirecionamento

  @Output() buttonClick: EventEmitter<void> = new EventEmitter();  // Evento de clique

  // Função para emitir o evento de clique
  onClick() {
    this.buttonClick.emit();  // Emite o evento quando o botão for clicado
  }
}
