import { Component } from '@angular/core';
import { UploadsService } from '../../service/uploads.service';

@Component({
  selector: 'app-school-message',
  standalone: true,
  imports: [],
  templateUrl: './school-message.component.html',
  styleUrl: './school-message.component.css'
})
export class SchoolMessageComponent {
  msgs:any[]=[];
  constructor(private message:UploadsService){}
  ngOnInit(): void {
    this.fetchMessage();
  }

  fetchMessage() {
    this.message.getSchoolMessage().subscribe(msgs => {
      this.msgs = msgs;
    }, error => {
      console.error('Error fetching images:', error);
    });
  }

}
