import { Component, OnInit } from '@angular/core';
import { FeeService } from '../../service/fee.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feepage',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './feepage.component.html',
  styleUrl: './feepage.component.css'
})
export class FeepageComponent implements OnInit {
  feeForm!: FormGroup;
  feeDetails: any[] = [];

  constructor(private fb: FormBuilder, private feeservice: FeeService) {}

  ngOnInit(): void {
    this.feeForm = this.fb.group({
      session: [''],
      selectedClass: [''],
      stream: ['']
    });
  }

  onClassChange(): void {
    const selectedClass = this.feeForm.get('selectedClass')?.value;
    if (selectedClass === '11' || selectedClass === '12') {
    } else {
      this.fetchFeeDetails(selectedClass, '');
    }
  }

  fetchFeeDetails(selectedClass: string, selectedStream: string): void {
    this.feeservice.getFeeDetails(selectedClass, selectedStream).subscribe(data => {
      this.feeDetails = data;
      console.log('Fee Details:', this.feeDetails);
    });
  }

  onSubmit(): void {
    const selectedClass = this.feeForm.get('selectedClass')?.value;
    const selectedStream = this.feeForm.get('stream')?.value || '';

    if (selectedClass) {
      this.fetchFeeDetails(selectedClass, selectedStream);
    } else {
      console.error('No class selected');
    }
  }
}
