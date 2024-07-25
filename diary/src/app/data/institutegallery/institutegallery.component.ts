import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UploadsService } from '../../service/uploads.service';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'app-institutegallery',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './institutegallery.component.html',
  styleUrl: './institutegallery.component.css'
})
export class InstitutegalleryComponent {
  galleryform: FormGroup<any>;
images:any[]=[];
constructor(private fb:FormBuilder,private upload:GalleryService){
  this.galleryform = this.fb.group({
    image: [null]
  });

}
onFileChange(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.galleryform.patchValue({
      image: file
    });
  }
}
OnSubmit() {
  const formData = new FormData();
  formData.append('image', this.galleryform.get('image')?.value);

  this.upload.uploadphoto(formData).subscribe(
    response => {
      this.galleryform.reset();
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
  });
}

// deletecarousel(id: number) {
//   if (confirm('Are you sure you want to delete this image?')) {
//     this.upload.deletephoto(id).subscribe(response => {
//       console.log('Image deleted:', response);
//       // Optionally, update the image list after deletion
//       this.fetchImages();
//     }, error => {
//       console.error('Error deleting image:', error);
//     });
//   }
// }
}

