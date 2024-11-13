import { Component } from '@angular/core';
import { MenubarComponent } from "../../components/menubar/menubar.component";
import { ContentComponent } from "../../components/content/content.component";
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenubarComponent, MatIconModule, ContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard');
  }
}
