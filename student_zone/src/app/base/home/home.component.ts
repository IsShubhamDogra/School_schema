import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../navigaton/nav/nav.component';
import { RouterLink } from '@angular/router';
import{MatIconModule} from '@angular/material/icon'
import { UploadsService } from '../../service/uploads.service';
import { CommonModule } from '@angular/common';
import { DemonvComponent } from '../../navigaton/demonv/demonv.component';
import { PmsgcomponentComponent } from '../pmsgcomponent/pmsgcomponent.component';
import { InfoTabForanouncementsComponent } from '../../pages/info-tab-foranouncements/info-tab-foranouncements.component';
import { GalleryComponent } from '../../pages/gallery/gallery.component';
import { PdfService } from '../../service/pdf.service';
import { SchoolMessageComponent } from '../../pages/school-message/school-message.component';
import { QueryComponent } from '../../pages/query/query.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,MatIconModule,CommonModule,DemonvComponent,
    PmsgcomponentComponent,InfoTabForanouncementsComponent,SchoolMessageComponent,
  GalleryComponent,QueryComponent,MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pdfs:any[] = [];
  images:any[]=[];
  images1:any[]=[];
  constructor(private message:UploadsService,private pdfService:PdfService){}
  ngOnInit(): void {
    this.fetchImages();
    this.loadImage();
    this.loadAllPdfs();
  }

  fetchImages() {
    this.message.getdmessage().subscribe(images => {
      this.images = images;
    }, error => {
      console.error('Error fetching images:', error);
    });
  }
  loadImage() {
    this.message.getImages().subscribe(images => {
      this.images1 = images;
    }, error => {
      console.error('Error fetching images:', error);
      // Handle error as needed
    });
  }

  //Anouncements call from DB through API
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

}
