import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';

@Component({
  selector: 'app-root',
  encapsulation:
  ViewEncapsulation.None,
  standalone: true,
  imports: [ RouterOutlet, MatIconModule, CommonModule, LogoComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sigae';
  loading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
