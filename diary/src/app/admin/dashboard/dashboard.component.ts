import { Component } from '@angular/core';
import { InformationComponent } from '../information/information.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InformationComponent,RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(){}

}
