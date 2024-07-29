import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeeService } from '../../service/fee.service';

@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fee-structure.component.html',
  styleUrl: './fee-structure.component.css'
})
export class FeeStructureComponent {
  feeForm!: FormGroup;
  constructor(private fb: FormBuilder, private feeservice: FeeService) {
    this.feeForm = this.fb.group({
      session: ['', Validators.required],
      classes: ['', Validators.required],
      stream: [''],
      fee: ['', Validators.required],
      uniform: ['', Validators.required],
      tour: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.feeForm.valid) {
      console.log('FormData:', this.feeForm.value);

      this.feeservice.uploadfee(this.feeForm.value).subscribe( response => {
          console.log(response);
        });
    }
  }

}
