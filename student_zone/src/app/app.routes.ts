import { Routes } from '@angular/router';
import { HomeComponent } from './base/home/home.component';
import { AdmissionComponent } from './form/admission/admission.component';
import { DmessageComponent } from './pages/dmessage/dmessage.component';
import { SamplePapersComponent } from './base/sample-papers/sample-papers.component';
import { PrinciplaMessageComponent } from './pages/principla-message/principla-message.component';
import { FeepageComponent } from './pages/feepage/feepage.component';
import { SchoolMessageComponent } from './pages/school-message/school-message.component';
import { QueryComponent } from './pages/query/query.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'admission-form',component:AdmissionComponent},
    {path:'dmsg',component:DmessageComponent},
    {path:'qpapers',component:SamplePapersComponent},
    {path:'pmsg',component:PrinciplaMessageComponent},
    {path:'feepage',component:FeepageComponent},
    {path:'school_msg',component:SchoolMessageComponent},
    {path:'queryform',component:QueryComponent}
];
