import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { InformationComponent } from './admin/information/information.component';
import { ResultComponent } from './admin/result/result.component';
import { NoticeComponent } from './admin/notice/notice.component';
import { ClassTestComponent } from './form/class-test/class-test.component';
import { UtComponent } from './form/ut/ut.component';
import { MstComponent } from './form/mst/mst.component';
import { FinalComponent } from './form/final/final.component';
import { HolidaysComponent } from './data/holidays/holidays.component';
import { TeacherInfoComponent } from './data/teacher-info/teacher-info.component';
import { FeeStructureComponent } from './data/fee-structure/fee-structure.component';
import { StudyMaterialComponent } from './admin/study-material/study-material.component';
import { InstInfoComponent } from './admin/inst-info/inst-info.component';
import { DirectMsgComponent } from './data/direct-msg/direct-msg.component';
import { CarouselComponent } from './data/carousel/carousel.component';
import { PNsgComponent } from './data/p-nsg/p-nsg.component';
import { PtmComponent } from './data/ptm/ptm.component';
import { RegannouncecompComponent } from './data/regannouncecomp/regannouncecomp.component';
import { InstitutegalleryComponent } from './data/institutegallery/institutegallery.component';

export const routes: Routes = [
    {path:'',component:InformationComponent},
    {path:'result',component:ResultComponent},
    {path:'notice',component:NoticeComponent},
    {path:'classTest',component:ClassTestComponent},
    {path:'ut',component:UtComponent},
    {path:'mst',component:MstComponent},
    {path:'final',component:FinalComponent},
    {path:'holidays',component:HolidaysComponent},
    {path:'teacher-record',component:TeacherInfoComponent},
    {path:'fee-stuc',component:FeeStructureComponent},
    {path:'qpaper',component:StudyMaterialComponent},
    {path:'info-update',component:InstInfoComponent},
    {path:'director-msg',component:DirectMsgComponent},
    {path:'carousel',component:CarouselComponent},
    {path:'pmsg',component:PNsgComponent},
    {path:'ptm',component:PtmComponent},
    {path:'regannounce',component:RegannouncecompComponent},
    {path:'gallery',component:InstitutegalleryComponent}
];
