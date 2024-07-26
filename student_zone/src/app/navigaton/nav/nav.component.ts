import { Component } from '@angular/core';
import { Router } from 'express';
import { LoginComponent } from '../../form/login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { HomeComponent } from '../../base/home/home.component';
import { DemonvComponent } from '../demonv/demonv.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubscribeService } from '../../service/subscribe.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,RouterOutlet,MatDialogContent,HomeComponent,DemonvComponent,ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  subscribeform : FormGroup
  constructor (private dialog:MatDialog,private fb:FormBuilder,private sub:SubscribeService){
    this.subscribeform = this.fb.group({
      email: [''],
    });
  }
openDialog() {
  this.dialog.open(LoginComponent, {
    width: '45rem',
  });
}

onSubmit(){
  if(this.subscribeform.valid){
    this.sub.subscribedone(this.subscribeform.value).subscribe(
      response => {
        alert('Subscribe successful:');
      },
      error => {
        alert('Already Subscribed');
      }
    );
    this.subscribeform.reset();
  }
}

}
