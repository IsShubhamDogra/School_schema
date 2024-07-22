import { Component } from '@angular/core';
import { UploadsService } from '../../service/uploads.service';

@Component({
  selector: 'app-principla-message',
  standalone: true,
  imports: [],
  templateUrl: './principla-message.component.html',
  styleUrl: './principla-message.component.css'
})
export class PrinciplaMessageComponent {
  images:any[]=[];
  constructor(private message:UploadsService){}
  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages() {
    this.message.pmsg().subscribe(images => {
      this.images = images;
    }, error => {
      console.error('Error fetching images:', error);
    });
  }
}
