import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadsService } from '../../service/uploads.service';

@Component({
  selector: 'app-direct-msg',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './direct-msg.component.html',
  styleUrl: './direct-msg.component.css'
})
export class DirectMsgComponent {
  uploadForm: FormGroup;
  images:any[]=[];
  // name: string = '';
  // message: string = '';
  // image: File | null = null;

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
      this.uploadservice.uploadImage(formData).subscribe(response => {
        console.log(response);
      });
    }
  }
  // fetching data
  ngOnInit(): void {
    this.fetchImages();
  }
  fetchImages() {
    this.uploadservice.getdmessage().subscribe(images => {
      this.images = images;
    }, error => {
      console.error('Error fetching images:', error);
      // Handle error as needed
    });
}
deleteImage(id: number) {
  if (confirm('Are you sure you want to delete this image?')) {
    this.uploadservice.deleteImage(id).subscribe(response => {
      console.log('Image deleted:', response);
      // Optionally, update the image list after deletion
      this.fetchImages();
    }, error => {
      console.error('Error deleting image:', error);
    });
  }
}
}
