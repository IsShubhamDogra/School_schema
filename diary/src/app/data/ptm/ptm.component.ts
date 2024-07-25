import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PdfService } from '../../service/pdf.service';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-ptm',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,ReactiveFormsModule,
    MatListModule
  ],
  templateUrl: './ptm.component.html',
  styleUrl: './ptm.component.css'
})
export class PtmComponent {
  ptmform! : FormGroup;
  selectedFile: File | null = null;
  ptmpdfs: any[] = [];

  constructor(private fb: FormBuilder, private ptmservice:PdfService){
    this.ptmform = this.fb.group({
      text: ['']
    });
  }
   
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event:any){
    event.preventDefault();
    if (this.selectedFile && this.ptmform.get('text')?.value) {
      const text = this.ptmform.get('text')?.value;
      this.ptmservice.uploadptmform(this.selectedFile, text).subscribe(response => {
        console.log('Upload successful:', response);
      }, error => {
        console.error('Upload error:', error);
      });
    }
}
//getpdf

ngOnInit(): void {
  this.loadAllptmPdfs();
}
loadAllptmPdfs() {
  this.ptmservice.getAllptmPdfs().subscribe(ptmpdfs => {
    this.ptmpdfs = ptmpdfs;
  }, error => {
    console.error('Error fetching PDFs:', error);
  });
}
getPtmUrl(id: number): string {
return this.ptmservice.getPtmUrl(id);
}
// delete pdf

ptmDlt(id: number) {
if (confirm('Are you sure you want to delete this PDF?')) {
  this.ptmservice.deleteptmpdf(id).subscribe(response => {
    console.log('Pdf deleted:', response);
    // Optionally, update the image list after deletion
    this.loadAllptmPdfs();
  }, error => {
    console.error('Error deleting PDF:', error);
  });
}
}
}
