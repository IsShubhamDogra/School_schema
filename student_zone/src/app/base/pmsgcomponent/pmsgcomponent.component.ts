import { Component } from '@angular/core';
import { UploadsService } from '../../service/uploads.service';
import { RouterLink } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-pmsgcomponent',
  standalone: true,
  imports: [RouterLink,MatDividerModule],
  template: `
   <div class="msg-box">
    <!-- <div class="msg">
      <h1>Principal Message</h1>
    </div> -->
   <div class="message">
           @if (images.length > 0) { <div class="out">
              @for (image of images; track $index) {  <div class="in">
                    <img [src]="image.image" alt="{{ image.name }}" width="300">
                    <div class="div2">
                    <h3>{{ image.name }}</h3>
                    <a routerLink="/pmsg">
                    <button class="btn btn-light">Read more</button></a>
                    </div>
                </div>
              <mat-divider></mat-divider>}
            </div>}</div>
   </div>
  `,
  styles: `
  .div2{
    display:grid;
  }
  .msg-box{
    width:fit-content;
    border-radius:6px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .message{
    padding:12px;
    width:20rem;
  }
  .out{
    display:flex;
    flex-direction:column;
    gap:5px;
  }
  img{
    width:80px;
    border:1px solid white;
    padding:12px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    height:80px
  }
  .in{
    display:flex;
    gap:12px;
    h3{
      font-size:15px;
      font-weight:500;
      color:rgb(30, 136, 30);
    };
  }
  `
})
export class PmsgcomponentComponent {
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
