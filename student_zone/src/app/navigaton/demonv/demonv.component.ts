import { Component } from '@angular/core';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { LoginComponent } from '../../form/login/login.component';

@Component({
  selector: 'app-demonv',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './demonv.component.html',
  styleUrl: './demonv.component.css'
})
export class DemonvComponent {
  constructor (private dialog:MatDialog){}
  openDialog() {
    this.dialog.open(LoginComponent, {
      width: '45rem',
    });
  }

}
