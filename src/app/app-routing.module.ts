import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SignInComponent } from "./modules/user/sign-in/sign-in.component";
import { DefaultLayoutNewComponent } from "./layout/default-layout-new/default-layout-new.component";
import { DefaultDashboardComponent } from "./layout/default-dashboard/default-dashboard.component";
import { RouteGuardService } from "./shared/services/route-guard.service";
// import { TripManagementComponent } from "./modules/trip-management/trip-management.component";
// import { DriverManagementComponent } from "./modules/driver-management/driver-management.component";
// import { TripManagementByDriverComponent } from "./modules/trip-management/trip-management-by-driver/trip-management-by-driver.component";
// import { LeaveManagementComponent } from "./modules/leave-management/leave-management.component";

const routes: Routes = [
  { path: "", component: SignInComponent, pathMatch: "full" },
  { path: "login", component: SignInComponent },
  {
    path: "dashboard",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: DefaultDashboardComponent,
      },
    ],
  },
  {
    path: "user",
    loadChildren: () =>
      import("./modules/user/user.module").then((m) => m.UserModule),
    canActivate: [RouteGuardService],
  },
  {
    path: "pose-detection",
    loadChildren: () =>
      import("./modules/pose-detection-form/pose-detection-form.module").then((m) => m.PoseDetectionFormModule),
    canActivate: [RouteGuardService],
  },
  // {
  //   path: "leave-management",
  //   loadChildren: () =>
  //     import("./modules/leave-management/leave-management.module").then(
  //       (m) => m.LeaveManagementModule
  //     ),
  //   canActivate: [RouteGuardService],
  // },
  // {
  //   path: "vehicle-management",
  //   component: DefaultLayoutNewComponent,
  //   children: [
  //     {
  //       path: "",
  //       component: VehicleManagementComponent,
  //     },
  //   ],
  //   canActivate: [RouteGuardService],
  // },
  // {
  //   path: "trip-management",
  //   loadChildren: () =>
  //     import("./modules/trip-management/trip-management.module").then(
  //       (m) => m.TripManagementModule
  //     ),
  //   canActivate: [RouteGuardService],
  // },
  // {
  //   path: "trip-management",
  //   component: DefaultLayoutNewComponent,
  //   children: [
  //     {
  //       path: "",
  //       component: TripManagementComponent,
  //     },
  //   ],
  //   canActivate: [RouteGuardService],
  // },
  // {
  //   path: "trip-management-by-driver",
  //   component: DefaultLayoutNewComponent,
  //   children: [
  //     {
  //       path: "",
  //       component: TripManagementByDriverComponent,
  //     },
  //   ],
  //   canActivate: [RouteGuardService],
  // },
  // {
  //   path: "vehicle-management",
  //   component: VehicleManagementComponent,
  //   canActivate: [RouteGuardService],
  // },
  // {
  //   path: "month-audit",
  //   loadChildren: () =>
  //     import("./modules/month-audit/month-audit.module").then(
  //       (m) => m.MonthAuditModule
  //     ),
  //   canActivate: [RouteGuardService],
  // },
  // {
  //   path: "vehicle-tracking",
  //   loadChildren: () =>
  //     import("./modules/vehicle-tracking/vehicle-tracking.module").then(
  //       (m) => m.VehicleTrackingModule
  //     ),
  //   canActivate: [RouteGuardService],
  // },
  {
    path: "reports",
    loadChildren: () =>
      import("./modules/report-management/report-management.module").then(
        (m) => m.ReportManagementModule
      ),
    canActivate: [RouteGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // imports: [
  //     RouterModule.forRoot([
  //         {
  //             path: '', component: AppMainComponent,
  //             // children: [
  //             //     {path: 'blocks', component: BlocksComponent},
  //             // ]
  //         },
  //         {path: '**', redirectTo: '/notfound'},
  //     ], {scrollPositionRestoration: 'enabled'})
  // ],
  // exports: [RouterModule]
})
export class AppRoutingModule { }
