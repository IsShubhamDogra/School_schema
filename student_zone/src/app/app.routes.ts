import { Routes } from '@angular/router';
import { HomeComponent } from './base/home/home.component';
import { AdmissionComponent } from './form/admission/admission.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'admission-form',component:AdmissionComponent},
];
