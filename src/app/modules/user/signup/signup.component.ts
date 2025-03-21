import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
// import { AppComponent } from "src/app/app.component";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { AppMessageService } from "src/app/shared/services/app-message.service";
// import { AppMessageService } from "src/app/shared/services/app-message.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { PopupService } from "src/app/shared/services/popup.service";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  FV = new CommonForm();
  systemInformation: any;
  passwordType: string = "password";

  constructor(
    private formBuilder: FormBuilder,
    private masterDataService: MasterDataService,
    private messageService: AppMessageService,

    private sidebarService: SidebarService,
    // private appComponent: AppComponent,
    private popupService: PopupService,
    private ref: DynamicDialogRef,
    private transactionService: TransactionHandlerService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
    });
  }

  // handleSubmit() {}

  onSignup() {
    let userName = this.FV.getValue("username");
    let password = this.FV.getValue("password");
    let email = this.FV.getValue("email");

    let obj = {
      username: userName,
      password: password,
      email: email,
    };

    this.transactionService.userSignup(obj).subscribe((res) => {
      console.log(res);
      if (res.IsSuccessful) {
        this.messageService.showSuccessAlert(res.Message);
        this.ref.close(true);
      } else {
        this.messageService.showErrorAlert(res.Message);
      }
    });
  }

  onclickLogin() {
    this.ref.close(true);
  }
}
