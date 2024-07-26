import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  constructor(private fb: FormBuilder,private feeservice:FeeService) {
    this.feeForm = this.fb.group({
      class: [''],
      stream: [''],
      fee: [''],
      uniform: [''],
      tour: ['']
    });
  }
  selectClass(event: Event) {
    const selectedClass = (event.target as HTMLSelectElement).value;
    if (selectedClass === '11' || selectedClass === '12') {
      this.feeForm.addControl('stream', new FormControl(''));
    } else {
      this.feeForm.removeControl('stream');
    }
  }

  onSubmit() {
    console.log(this.feeForm.value);
    const formData = new FormData();
    formData.append('class', this.feeForm.get('class')?.value);
    formData.append('stream', this.feeForm.get('stream')?.value);
    formData.append('fee', this.feeForm.get('fee')?.value);
    formData.append('uniform', this.feeForm.get('uniform')?.value);
    formData.append('tour', this.feeForm.get('tour')?.value);
    this.feeservice.uploadfee(formData).subscribe(response => {
      console.log(response);
    });
    window.location.reload();
  }
}
