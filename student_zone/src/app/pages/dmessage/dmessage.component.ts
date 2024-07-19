import { Component, OnInit } from '@angular/core';
import { UploadsService } from '../../service/uploads.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dmessage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dmessage.component.html',
  styleUrl: './dmessage.component.css'
})
export class DmessageComponent implements OnInit {
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
      // Handle error as needed
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
