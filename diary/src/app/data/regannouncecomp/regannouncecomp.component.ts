import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdfService } from '../../service/pdf.service';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-regannouncecomp',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatDividerModule,MatListModule,
    MatDatepickerModule,MatInputModule
  ],
  templateUrl: './regannouncecomp.component.html',
  styleUrl: './regannouncecomp.component.css'
})
export class RegannouncecompComponent {
  activepdf: FormGroup;
  selectedFile: File | null = null;
  // pdfFilename: string = 'example.pfd'; 
  pdfUrl: string | null = null;
  pdfs: any[] = [];

  constructor(private fb: FormBuilder, private pdfService: PdfService) {
    this.activepdf = this.fb.group({
      text: [''],
    });
  }

 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadPDF(event: Event) {
    event.preventDefault();
    if (this.selectedFile && this.activepdf.get('text')?.value) {
      const text = this.activepdf.get('text')?.value;
      this.pdfService.uploadPdf(this.selectedFile, text).subscribe(response => {
        console.log('Upload successful:', response);
      }, error => {
        console.error('Upload error:', error);
      });
    }
  }
  ngOnInit(): void {
    this.loadAllPdfs();
  }
  loadAllPdfs() {
    this.pdfService.getAllPdfs().subscribe(pdfs => {
      this.pdfs = pdfs;
    }, error => {
      console.error('Error fetching PDFs:', error);
    });
}
getPdfUrl(id: number): string {
  return this.pdfService.getPdfUrl(id);
}
// delete pdf

pdfDlt(id: number) {
  if (confirm('Are you sure you want to delete this PDF?')) {
    this.pdfService.deletepdf(id).subscribe(response => {
      console.log('Pdf deleted:', response);
      // Optionally, update the image list after deletion
      this.loadAllPdfs();
    }, error => {
      console.error('Error deleting PDF:', error);
    });
  }
}

}
