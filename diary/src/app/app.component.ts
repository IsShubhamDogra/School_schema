import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { RouterTestingModule } from '@angular/router/testing';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [ DashboardComponent]
})
export class AppComponent {
  title = 'diary';
}
