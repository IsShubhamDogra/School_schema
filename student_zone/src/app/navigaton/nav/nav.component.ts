import { Component } from '@angular/core';
import { Router } from 'express';
import { LoginComponent } from '../../form/login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { HomeComponent } from '../../base/home/home.component';
import { DemonvComponent } from '../demonv/demonv.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,RouterOutlet,MatDialogContent,HomeComponent,DemonvComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor (private dialog:MatDialog){}
openDialog() {
  this.dialog.open(LoginComponent, {
    width: '45rem',
  });
}

}
