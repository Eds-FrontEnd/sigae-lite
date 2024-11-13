import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class DynamicButtonComponent {
  @Input() buttonText: string = '';  // Texto do botão
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';  // Tipo do botão (padrão é 'button')
  @Input() titleText: string = '';  // Texto alternativo para acessibilidade

  @Output() buttonClick: EventEmitter<void> = new EventEmitter();  // Evento de clique

  onClick() {
    this.buttonClick.emit();  // Emite o evento quando o botão for clicado
  }
}
