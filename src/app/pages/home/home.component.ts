import { Component, ViewEncapsulation } from '@angular/core';
import { MenubarComponent } from "../../components/menubar/menubar.component";
import { ContentComponent } from "../../components/content/content.component";


@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [MenubarComponent, ContentComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
