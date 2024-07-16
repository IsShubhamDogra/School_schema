import { Component } from '@angular/core';
import { InformationComponent } from '../information/information.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InformationComponent,RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private dialog:MatDialog){}
  openSignup() {
    this.dialog.open(SignUpComponent, {
      width: '40rem',
    });
    }

    close() {
      window.close();
      }
}
