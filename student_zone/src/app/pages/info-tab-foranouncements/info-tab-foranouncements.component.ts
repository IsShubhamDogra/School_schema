import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PdfService } from '../../service/pdf.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-info-tab-foranouncements',
  standalone: true,
  imports: [MatTabsModule,MatDividerModule,MatListModule],
  templateUrl: './info-tab-foranouncements.component.html',
  styleUrl: './info-tab-foranouncements.component.css'
})
export class InfoTabForanouncementsComponent implements OnInit {
  pdfs:any[] = [];
  ptmpdfs:any[] = [];
  acdmicpdfs:any[] = [];
  constructor(private pdfService:PdfService){}

  ngOnInit(): void {
    this.loadAllPdfs();
    this.loadAllptmPdfs();
    this.loadAllacademicpdf();
  }
  //pdf call
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
//ptm call

loadAllptmPdfs() {
  this.pdfService.getAllptmPdfs().subscribe(ptmpdfs => {
    this.ptmpdfs = ptmpdfs;
  }, error => {
    console.error('Error fetching PDFs:', error);
  });
}
getPtmUrl(id: number): string {
return this.pdfService.getPtmUrl(id);
}

//academic call

loadAllacademicpdf() {
  this.pdfService.getAllacademicPdfs().subscribe(acdmicpdfs => {
    this.acdmicpdfs = acdmicpdfs;
  }, error => {
    console.error('Error fetching PDFs:', error);
  });
}
getacademicUrl(id: number): string {
return this.pdfService.getacademicUrl(id);
}
}
