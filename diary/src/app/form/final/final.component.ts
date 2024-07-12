import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, FormArray, FormsModule, AbstractControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-final',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent {
  finalForm: FormGroup;
  rollNumbers: { rollNumber: string, subjects: { subjectName: string, marks: string }[] }[] = [];

  subjects: { [key: string]: string[] } = {
    '1': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '2': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '3': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '4': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '5': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '6': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '7': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '8': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '9': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '10': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Drawing'],
    '11': [],
    '12': []
  };

  defaultRanges: { [key: string]: number } = {
    '1': 1001,
    '2': 2001,
    '3': 3001,
    '4': 4001,
    '5': 5001,
    '6': 6001,
    '7': 7001,
    '8': 8001,
    '9': 9001,
    '10': 10001,
    '11': 11001,
    '12': 12001
  };

  streams: { [key: string]: string[] } = {
    'Science': ['English', 'Maths', 'Biology', 'Chemistry', 'Physics', 'Computer', 'Physical Education'],
    'Commerce': ['Accounts', 'Maths', 'Business Studies', 'Economics', 'English', 'Physical Education', 'Computer'],
    'Arts': ['English', 'Maths', 'Philosophy', 'History', 'Computer', 'Political Science']
  };

  constructor(private fb: FormBuilder) {
    this.finalForm = this.fb.group({
      class: [''],
      stream: [''],
      range: [''],
      rollNumbers: this.fb.array([]),
      subjects: this.fb.array([])
    });
  }

  selectClass(event: Event) {
    const selectedClass = (event.target as HTMLSelectElement).value;
    if (selectedClass === '11' || selectedClass === '12') {
      this.finalForm.addControl('stream', new FormControl(''));
    } else {
      this.finalForm.removeControl('stream');
    }
  }

  addTable() {
    const selectedClass = this.finalForm.get('class')?.value;
    const range = this.finalForm.get('range')?.value;
    const stream = this.finalForm.get('stream')?.value || '';

    this.generateRollNumbers(selectedClass, range, stream);
    this.generateSubjectsFormControls(selectedClass, stream);
  }

  generateRollNumbers(selectedClass: string, range: number, stream: string): void {
    const defaultRange = this.defaultRanges[selectedClass];
    const rollNumbersArray = this.finalForm.get('rollNumbers') as FormArray;
    rollNumbersArray.clear();

    for (let i = 1; i <= range; i++) {
      let rollNumber = `${defaultRange}${this.pad(i, 2)}`;
      if (selectedClass === '11' || selectedClass === '12') {
        rollNumber += stream.substring(0, 3).toUpperCase();
      }
      const subjects = this.getSubjectsForClassAndStream(selectedClass, stream);
      rollNumbersArray.push(this.fb.group({
        rollNumber: new FormControl(rollNumber),
        subjects: this.fb.array(subjects.map(subject => this.fb.group({
          subjectName: new FormControl(subject),
          marks: new FormControl('', Validators.required)
        })))
      }));
    }
  }

  pad(num: number, size: number): string {
    let numStr = num.toString();
    while (numStr.length < size) numStr = "0" + numStr;
    return numStr;
  }

  getSubjectsForClassAndStream(selectedClass: string, stream: string): string[] {
    if (selectedClass === '11' || selectedClass === '12') {
      return this.streams[stream] || [];
    }
    return this.subjects[selectedClass] || [];
  }

  generateSubjectsFormControls(selectedClass: string, stream: string): void {
    const subjects = this.getSubjectsForClassAndStream(selectedClass, stream);
    const subjectsFormArray = this.finalForm.get('subjects') as FormArray;
    subjectsFormArray.clear();
    subjects.forEach(subject => {
      subjectsFormArray.push(this.fb.group({
        subjectName: new FormControl(subject),
        marks: new FormControl('')
      }));
    });
  }

  get rollNumbersFormArray(): FormArray {
    return this.finalForm.get('rollNumbers') as FormArray;
  }

  get subjectsFormArray(): FormArray {
    return this.finalForm.get('subjects') as FormArray;
  }

  commitRow(index: number): void {
    const rollNumberControl = this.rollNumbersFormArray.at(index) as FormGroup;
    const rollNumber = rollNumberControl.get('rollNumber')?.value;

    const subjectControl = this.subjectsFormArray;

    const marks = subjectControl.value.map((res: any) => `${res.subjectName} = ${res.marks}`);
    const record = {
      rollNumber: rollNumber,
      subjects: marks,
    };


    console.log(record);

  }


  finalResult() {
    console.log(this.finalForm.value);
  }
}
