import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoseDetectionFormRoutingModule } from './pose-detection-form-routing.module';
import { FrontDoubleBicepeFormComponent } from './front-double-bicepe-form/front-double-bicepe-form.component';


@NgModule({
  declarations: [
    FrontDoubleBicepeFormComponent
  ],
  imports: [
    CommonModule,
    PoseDetectionFormRoutingModule
  ]
})
export class PoseDetectionFormModule { }
