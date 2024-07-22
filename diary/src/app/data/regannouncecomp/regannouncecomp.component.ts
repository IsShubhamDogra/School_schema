import { Component } from '@angular/core';
import { UploadsService } from '../../service/uploads.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-regannouncecomp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './regannouncecomp.component.html',
  styleUrl: './regannouncecomp.component.css'
})
export class RegannouncecompComponent {
  activepdf: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private pdfService: UploadsService) {
    this.activepdf = this.fb.group({
      text: ['']
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadPDF(event: Event): void {
    event.preventDefault();
    if (this.selectedFile && this.activepdf.value.text) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('text', this.activepdf.value.text);

      this.pdfService.uploadPDF(formData).subscribe(
        response => {
          console.log('Upload success:', response);
        },
        error => {
          console.error('Upload error:', error);
        }
      );
    }
  }

  fetchPDF(): void {
    const pdfId = 1; // Replace with the actual PDF ID you want to fetch
    this.pdfService.fetchPDF(pdfId).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Fetch error:', error);
      }
    );
  }
}
