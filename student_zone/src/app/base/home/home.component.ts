import { Component } from '@angular/core';
import { NavComponent } from '../../navigaton/nav/nav.component';
import { RouterLink } from '@angular/router';
import{MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
