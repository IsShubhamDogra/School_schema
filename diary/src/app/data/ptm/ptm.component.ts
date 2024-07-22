import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-ptm',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,ReactiveFormsModule],
  templateUrl: './ptm.component.html',
  styleUrl: './ptm.component.css'
})
export class PtmComponent {
  ptmform! : FormGroup;

  constructor(private fb: FormBuilder){
    this.ptmform = this.fb.group({
      date: [''],
      title: [''],
      msg: ['']
    });
  }
  onSubmit(){
    console.log(this.ptmform.value);
    this.ptmform.reset();
  }
}
