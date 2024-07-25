import { Component } from '@angular/core';
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
export class InfoTabForanouncementsComponent {
  pdfs:any[] = [];
  constructor(private pdfService:PdfService){}

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

}
