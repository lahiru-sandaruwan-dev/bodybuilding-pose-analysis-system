import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutNewComponent } from 'src/app/layout/default-layout-new/default-layout-new.component';
import { FrontDoubleBicepeFormComponent } from './front-double-bicepe-form/front-double-bicepe-form.component';

const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: FrontDoubleBicepeFormComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoseDetectionFormRoutingModule { }
