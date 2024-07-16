import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stream } from 'stream';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.css'
})
export class AdmissionComponent implements OnInit{
  admissionForm!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  signUrl: string | ArrayBuffer | null = null;
  areBothCheckboxesSelected: boolean = false;
  // randomNumber: number | null = null;
  constructor(private fb: FormBuilder,private router:Router) {}
  ngOnInit(): void {
    this.admissionForm = this.fb.group({
      afname: ['', Validators.required],
      alname: [''],
      amname: [''],
      ffname: ['', Validators.required],
      flname: [''],
      fmname: [''],
      mfname: ['', Validators.required],
      mlname: [''],
      mmname: [''],
      gender: [''],
      phone: ['', Validators.required],
      Aphone: [''],
      email: ['', Validators.required],
      Aone: ['', Validators.required],
      Atwo: ['', Validators.required],
      Athree: ['', Validators.required],
      pcode: ['', Validators.required],
      class: ['', Validators.required],
      stream: ['']
    });
  }
  selectClass(event: Event) {
    const selectedClass = (event.target as HTMLSelectElement).value;
    if (selectedClass === '11' || selectedClass === '12') {
      this.admissionForm.addControl('stream', new FormControl(''));
    } else {
      this.admissionForm.removeControl('stream');
    }
  }

  onFileSelected(event: any): void {
    const file1 = event.target.files[0];
    if (file1 && file1.type.startsWith('image/')) {
      this.selectedFile = file1;
    } else {
      this.selectedFile = null;
      this.imageUrl = null;
      alert('Please select a valid image file.');
    }
  }
  onsignselected(event: any): void {
    const file2 = event.target.files[0];
    if (file2 && file2.type.startsWith('image/')) {
      this.selectedFile = file2;
    } else {
      this.selectedFile = null;
      this.signUrl = null;
      alert('Please select a valid image file.');
    }
  }
  onCommit(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      alert('No file selected.');
    }
  }
  onCommit1(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.signUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      alert('No file selected.');
    }
  }
  onCheckboxChange(event: any): void {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedCheckboxes = Array.from(checkboxes).filter((checkbox: any) => checkbox.checked);
    this.areBothCheckboxesSelected = selectedCheckboxes.length === 3;
  }
  // get formreset(){
  //   return this.admissionForm.reset();
  // }
  // // generateRandomNumber(): void {
  //   console.log('Form:', this.admissionForm.value);
  //   this.randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  //   alert(`Application Number: ${this.randomNumber}`);
  //   this.formreset;
  // }
  onsubmit():void {
    // if(this.admissionForm.valid){
    //   console.log(this.admissionForm.value);
      this.router.navigateByUrl('/application')
    // }else{
    //   console.log('invalid form');
    // }
    }
}
