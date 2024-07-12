import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogContent} from '@angular/material/dialog'
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [MatDialogContent,RouterLink],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent implements OnInit {
  userCount: number = 0;

  constructor(private dialog:MatDialog,private userService:UserService){}
  ngOnInit(): void {
    
    this.userService.getUserCount().subscribe(
      data => {
        this.userCount = data.count;
      },
      error => {
        console.error('Error fetching user count:', error);
      }
    );
  }
}
