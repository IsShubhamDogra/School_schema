import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup ;
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private formBuilder:FormBuilder,
     private registerService: RegisterService ){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    }); 
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  openProjectB(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.registerService.login(user).subscribe({
       next: (response) => {
          localStorage.setItem('token', response.token);
          window.open('http://localhost:4200', '_blank');
          this.closeDialog()
        },
        error:(error) => {
          console.log('Login failed',error);
          if (error.status === 401) {
            alert('Invalid password');
          } else if (error.status === 404) {
            alert('Email does not exist');
          } else {
            alert('An error occurred. Please try again later.');
          }

        }
      });
    }
    
}
}
