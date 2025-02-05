import { Component, OnInit } from "@angular/core";
import { CommonForm } from "../../services/app-common-form";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { AppMessageService } from "../../services/app-message.service";
import { MasterDataService } from "../../services/master-data.service";
import { TransactionHandlerService } from "../../services/transaction-handler.service";
import { MonthAditService } from "../../services/api-services/month-adit.service";

@Component({
  selector: "app-inactive-login",
  templateUrl: "./inactive-login.component.html",
  styleUrls: ["./inactive-login.component.css"],
})
export class InactiveLoginComponent implements OnInit {
  FV = new CommonForm();
  attempts: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private messageService: AppMessageService,
    private masterDataService: MasterDataService,
    private transactionService: TransactionHandlerService,
    private monthAuditService: MonthAditService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      password: ["", [Validators.required]],
    });
  }

  confirm() {
    if (this.FV.formGroup.invalid) {
      this.FV.showErrors();
      return;
    }

    this.attempts++;
    if (this.attempts > 2) {
      this.messageService.showErrorAlert(
        "You have exceeded the maximum number of attempts!"
      );
      this.cancel();
      return;
    }

    let password = this.FV.getValue("password");

    let request = {
      password: password,
    };

    this.transactionService
      .refreshAuthentication(request)
      .subscribe((response) => {
        if (response.IsSuccessful) {
          this.messageService.showSuccessAlert(response.Message);
          this.masterDataService.SessionKey = response.Result;
          this.monthAuditService.GetWorkingInformation().subscribe((response) => {
            if (response.IsSuccessful) {
              this.masterDataService.setWorkingInfo(response.Result);
              this.ref.close(true);
            }
          })
        } else {
          this.messageService.showErrorAlert(response.Message);
        }
      });
  }

  cancel() {
    this.ref.close(false);
  }
}
