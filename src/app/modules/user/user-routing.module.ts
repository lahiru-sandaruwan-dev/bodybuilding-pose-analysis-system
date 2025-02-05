import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddNewUserComponent } from "./add-new-user/add-new-user.component";
import { DefaultLayoutNewComponent } from "src/app/layout/default-layout-new/default-layout-new.component";
import { PersonalDetailsComponent } from "./add-new-user/add-new-user-form/personal-details/personal-details.component";

const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutNewComponent,
    children: [
      {
        path: "",
        component: AddNewUserComponent,
      },
    ],
  },

  { path: "personal", component: PersonalDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
