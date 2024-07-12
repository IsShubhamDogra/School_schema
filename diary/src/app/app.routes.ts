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
    {path:'fee-stuc',component:FeeStructureComponent}
];
