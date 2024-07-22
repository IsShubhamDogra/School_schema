import { Routes } from '@angular/router';
import { HomeComponent } from './base/home/home.component';
import { AdmissionComponent } from './form/admission/admission.component';
import { DmessageComponent } from './pages/dmessage/dmessage.component';
import { SamplePapersComponent } from './base/sample-papers/sample-papers.component';
import { PrinciplaMessageComponent } from './pages/principla-message/principla-message.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'admission-form',component:AdmissionComponent},
    {path:'dmsg',component:DmessageComponent},
    {path:'qpapers',component:SamplePapersComponent},
    {path:'pmsg',component:PrinciplaMessageComponent}
];
