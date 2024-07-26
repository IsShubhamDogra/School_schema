import { Component } from '@angular/core';
import { UploadsService } from '../../service/uploads.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  images:any[]=[];
  constructor(private upload:UploadsService){}

  ngOnInit(): void {
    this.fetchImages();
  }
  fetchImages() {
    this.upload.getGalleryImages().subscribe(images => {
      this.images = images;
    }, error => {
      console.error('Error fetching images:', error);
    });
  }

}
