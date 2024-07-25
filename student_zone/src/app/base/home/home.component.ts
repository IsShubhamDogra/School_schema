import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../navigaton/nav/nav.component';
import { RouterLink } from '@angular/router';
import{MatIconModule} from '@angular/material/icon'
import { UploadsService } from '../../service/uploads.service';
import { CommonModule } from '@angular/common';
import { DemonvComponent } from '../../navigaton/demonv/demonv.component';
import { PmsgcomponentComponent } from '../pmsgcomponent/pmsgcomponent.component';
import { InfoTabForanouncementsComponent } from '../../pages/info-tab-foranouncements/info-tab-foranouncements.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,MatIconModule,CommonModule,DemonvComponent,PmsgcomponentComponent,InfoTabForanouncementsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  images:any[]=[];
  images1:any[]=[];
  constructor(private message:UploadsService){}
  ngOnInit(): void {
    this.fetchImages();
    this.loadImage();
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

}
