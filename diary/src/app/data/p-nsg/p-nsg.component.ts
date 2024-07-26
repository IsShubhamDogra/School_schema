import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UploadsService } from '../../service/uploads.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-p-nsg',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './p-nsg.component.html',
  styleUrl: './p-nsg.component.css'
})
export class PNsgComponent {
  uploadForm: FormGroup;
  images:any[]=[];
  
  constructor(private fb: FormBuilder,private uploadservice:UploadsService) {
    this.uploadForm = this.fb.group({
      name: [''],
      message: [''],
      image: [null]
    });

   }
   onFileChange(event: any) {
    const file = event.target.files[0];
    this.uploadForm.patchValue({
      image: file
    });
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('name', this.uploadForm.get('name')?.value);
      formData.append('message', this.uploadForm.get('message')?.value);
      formData.append('image', this.uploadForm.get('image')?.value);
      console.log(this.uploadForm.value);
      this.fetchImages();
      this.uploadservice.Pmsgupload(formData).subscribe(response => {
        console.log(response);
      });
    }
    window.location.reload();
  }
  // fetching data
  ngOnInit(): void {
    this.fetchImages();
  }
  fetchImages() {
    this.uploadservice.getpmsg().subscribe(images => {
      this.images = images;
    }, error => {
      console.error('Error fetching images:', error);
      // Handle error as needed
    });
}
deleteImage(id: number) {
  if (confirm('Are you sure you want to delete this image?')) {
    this.uploadservice.deletepmsg(id).subscribe(response => {
      console.log('Image deleted:', response);
      // Optionally, update the image list after deletion
      this.fetchImages();
    }, error => {
      console.error('Error deleting image:', error);
    });
  }
}
}
