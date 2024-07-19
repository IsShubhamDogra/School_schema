import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-papers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-papers.component.html',
  styleUrl: './sample-papers.component.css'
})
export class SamplePapersComponent {
  classes: string[] = [];

  constructor() {
    this.generateClasses();
  }

  generateClasses() {
    for (let i = 1; i <= 12; i++) {
      this.classes.push(`Class-${i}`);
    }
  }

  handleClassFunctionality(className: string) {
    switch(className) {
      case 'Class-1':
        this.classOneFunction();
        break;
      case 'Class-2':
        this.classTwoFunction();
        break;
      // Add cases for other classes as needed
      default:
        console.log(`${className} clicked`);
    }
  }

  classOneFunction() {
    console.log('Functionality for Class-1');
    // Add specific functionality for Class-1 here
  }

  classTwoFunction() {
    console.log('Functionality for Class-2');
    // Add specific functionality for Class-2 here
  }

}
