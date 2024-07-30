import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UploadsService } from '../../service/uploads.service';

@Component({
  selector: 'app-school-msg',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './school-msg.component.html',
  styleUrl: './school-msg.component.css'
})
export class SchoolMsgComponent {
  uploadForm:FormGroup;
  msgs:any[]=[];

  constructor(private fb:FormBuilder, private schoolserv:UploadsService){
    this.uploadForm = this.fb.group({
      title: [''],
      message: ['']
    })
  }


  onSubmit(){
    if(this.uploadForm.valid){
      this.schoolserv.schoolMessage(this.uploadForm.value).subscribe( response => {
        console.log(response);
      });

    }
  }

  ngOnInit(): void {
    this.fetchSMessage();
  }
  fetchSMessage() {
    this.schoolserv.getSmsg().subscribe(msgs => {
      this.msgs = msgs;
    }, error => {
      console.error('Error fetching School Message:', error);
      // Handle error as needed
    });
}

deleteMessage(id: number) {
  if (confirm('Are you sure you want to delete this Message?')) {
    this.schoolserv.deleteSMsg(id).subscribe(response => {
      console.log('Message deleted:', response);
      // Optionally, update the image list after deletion
      this.fetchSMessage();
    }, error => {
      console.error('Error deleting Messsage:', error);
    });
  }
}

}
