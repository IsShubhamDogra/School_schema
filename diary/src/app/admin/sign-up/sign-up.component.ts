import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatDialogContent,MatDialogActions],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  registerForm! : FormGroup ;
  constructor(public dialogRef: MatDialogRef<SignUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder:FormBuilder,
  private registerService: UserService){}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Fname:['',Validators.required],
      Lname:[''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      Phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      gender:['']
    }, {
      validator: this.passwordMatchValidator
    });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mismatch: true });
    }
  }
  submit():void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful:', response);
        },
        error => {
          console.error('Registration error:', error);
        }
      );
      this.registerForm.reset();
    }
    
    }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
