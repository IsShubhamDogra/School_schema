import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-class-test',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './class-test.component.html',
  styleUrl: './class-test.component.css'
})
export class ClassTestComponent {
ctform: FormGroup;
rows: FormArray;

constructor(private fb: FormBuilder) {
  this.ctform = this.fb.group({
    class: ['', Validators.required],
    rollNumber: ['', Validators.required],
    subjects: this.fb.array([]),
  });
  this.rows = this.ctform.get('subjects') as FormArray;
}

createSubject(): FormGroup {
  return this.fb.group({
    subject: [''],
    totalMarks: [''],
    givenMarks: [''],
    status: [''],
  });
}

addRow() {
  this.rows.push(this.createSubject());
}

removeRow(index: number) {
  this.rows.removeAt(index);
}

selectClass(event: Event) {
  const selectedClass = (event.target as HTMLSelectElement).value;
  this.ctform.patchValue({ rollNumber: `${selectedClass}001` });
}
calculateStatus(row: any) {
  const totalMarks = row.get('totalMarks')?.value || 0;
  const givenMarks = row.get('givenMarks')?.value || 0;
  
  if (totalMarks === 0) {
    row.patchValue({ status: '' }); 
  } else {
    const percentage = (givenMarks / totalMarks) * 100;
    row.patchValue({ status: percentage < 35 ? 'Fail' : 'Pass' });
  }
}

onSubmit() {
  console.log(this.ctform.value);
  this.ctform.patchValue({
    rollNumber: `${this.ctform.get('class')?.value}001`,
    subjects: []
  });

  while (this.rows.length !== 0) {
    this.rows.removeAt(0);
  }
}
}
