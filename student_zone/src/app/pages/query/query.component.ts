import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubscribeService } from '../../service/subscribe.service';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent {
  queryform! : FormGroup;
  constructor(private fb:FormBuilder,private queryupload:SubscribeService){
    this.queryform = this.fb.group({
      email:[''],
      subject:[''],
      query:['']
    })
  }

  onSubmit(){
    if(this.queryform.valid){
      this.queryupload.QueryUpload(this.queryform.value).subscribe(
        response => {
          console.log('Query Shared Successfully!')
          console.log(this.queryform.value);
        }
      );
      this.queryform.reset();
    }
  }

}
