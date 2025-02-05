import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutNewComponent } from 'src/app/layout/default-layout-new/default-layout-new.component';
import { ReportNavigationDashboardComponent } from './report-navigation-dashboard/report-navigation-dashboard.component';

const routes: Routes = [{
  path: "",
  component: DefaultLayoutNewComponent,
  children: [
    {
      path: "",
      component: ReportNavigationDashboardComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagementRoutingModule { }
