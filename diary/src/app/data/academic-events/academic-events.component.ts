import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PdfService } from '../../service/pdf.service';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-academic-events',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatDividerModule,MatListModule,
    MatDatepickerModule,MatInputModule,MatFormFieldModule
  ],
  templateUrl: './academic-events.component.html',
  styleUrl: './academic-events.component.css'
})
export class AcademicEventsComponent {
  academicpdf: FormGroup;
  selectedFile: File | null = null;
  pdfUrl: string | null = null;
  pdfs: any[] = [];

  constructor(private fb: FormBuilder, private pdfService: PdfService) {
    this.academicpdf = this.fb.group({
      text: [''],
    });
  }

 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  academicPDF(event: Event) {
    event.preventDefault();
    if (this.selectedFile && this.academicpdf.get('text')?.value) {
      const text = this.academicpdf.get('text')?.value;
      this.pdfService.uploadacademicPdf(this.selectedFile, text).subscribe(response => {
        console.log('Upload successful:', response);
      }, error => {
        console.error('Upload error:', error);
      });
    }
  }
  ngOnInit(): void {
    this.loadAllacademicpdf();
  }
  loadAllacademicpdf() {
    this.pdfService.getAllacademicPdfs().subscribe(pdfs => {
      this.pdfs = pdfs;
    }, error => {
      console.error('Error fetching PDFs:', error);
    });
}
getacademicUrl(id: number): string {
  return this.pdfService.getacademicUrl(id);
}
// delete pdf

deleteacademicpdf(id: number) {
  if (confirm('Are you sure you want to delete this PDF?')) {
    this.pdfService.deleteacademicpdf(id).subscribe(response => {
      console.log('Pdf deleted:', response);
      // Optionally, update the image list after deletion
      this.loadAllacademicpdf();
    }, error => {
      console.error('Error deleting PDF:', error);
    });
  }
}


}
