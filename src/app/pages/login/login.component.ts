import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DynamicButtonComponent } from "../../components/button/button.component";
import { InputComponent } from '../../components/input/input.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, FormsModule, DynamicButtonComponent, InputComponent, LogoComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';
  emailInvalido: boolean = false;
  senhaInvalida: boolean = false;
  showRecaptcha: boolean = false;
  captchaAnswer: string = '';
  captchaIncorrect: boolean = false;
  captchaCorrect: boolean = false;
  captcha = { num1: 0, num2: 0 };
  captchaMessage: string = '';

  constructor(private titleService: Title, private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.showRecaptcha = true;
    this.generateCaptcha();
  }

  validarEmail(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailInvalido = !emailRegex.test(this.username);
  }

  generateCaptcha(): void {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);

    while (num1 + num2 > 9) {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
    }

    this.captcha.num1 = num1;
    this.captcha.num2 = num2;
  }

  checkCaptchaAnswer(): boolean {
    const userAnswer = parseInt((this.captchaAnswer || '').toString().trim(), 10);

    if (isNaN(userAnswer)) {
      this.captchaMessage = 'Por favor, insira um número válido!';
      this.captchaIncorrect = true;
      this.captchaCorrect = false;
      return false;
    }

    const correctAnswer = this.captcha.num1 + this.captcha.num2;

    if (userAnswer === correctAnswer) {
      this.captchaCorrect = true;
      this.showRecaptcha = false;
      return true;
    } else {
      this.captchaIncorrect = true;
      this.captchaCorrect = false;
      this.captchaMessage = '';
      return false;
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    const input = this.passwordInput.nativeElement;
    input.type = this.isPasswordVisible ? 'text' : 'password';
  }

  onSubmit(): void {
    this.validarEmail();
    this.validarSenha();

    if (!this.username || !this.password) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const isCaptchaValid = this.checkCaptchaAnswer();
    if (!isCaptchaValid) {
      alert('Resposta incorreta do reCAPTCHA! Tente novamente.');
      setTimeout(() => {
        this.generateCaptcha();
      }, 0);
      return;
    }

    const validEmail = 'teste@teste.com.br';
    const validPassword = 'Sigae/Lite50';

    if (this.username === validEmail && this.password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      alert('E-mail ou senha incorretos!');
    }
  }

  validarSenha(): void {
    this.senhaInvalida = this.password.length < 6;
  }

  currentButtonText: string = 'Entrar';
}
