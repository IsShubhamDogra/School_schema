import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UploadsService } from '../../service/uploads.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
carouselFrom: FormGroup<any>;
images:any[]=[];
constructor(private fb:FormBuilder,private upload:UploadsService){
  this.carouselFrom = this.fb.group({
    image: [null]
  });

}
onFileChange(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.carouselFrom.patchValue({
      image: file
    });
  }
}
OnSubmit() {
  const formData = new FormData();
  formData.append('image', this.carouselFrom.get('image')?.value);

  this.upload.uploadCarousel(formData).subscribe(
    response => {
      console.log('Image uploaded successfully:', response);
    },
    error => {
      console.error('Error uploading image:', error);
    }
  );
}
ngOnInit(): void {
  this.fetchImages();
}
fetchImages() {
  this.upload.getImages().subscribe(images => {
    this.images = images;
  }, error => {
    console.error('Error fetching images:', error);
    // Handle error as needed
  });
}

deletecarousel(id: number) {
  if (confirm('Are you sure you want to delete this image?')) {
    this.upload.deletecarousel(id).subscribe(response => {
      console.log('Image deleted:', response);
      // Optionally, update the image list after deletion
      this.fetchImages();
    }, error => {
      console.error('Error deleting image:', error);
    });
  }
}

}
