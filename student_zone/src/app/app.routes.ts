import { Routes } from '@angular/router';
import { HomeComponent } from './base/home/home.component';
import { AdmissionComponent } from './form/admission/admission.component';
import { AfterSubmitComponent } from './base/after-submit/after-submit.component';
import { DmessageComponent } from './pages/dmessage/dmessage.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'admission-form',component:AdmissionComponent},
    {path:'application',component:AfterSubmitComponent},
    {path:'dmsg',component:DmessageComponent}
];
