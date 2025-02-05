import { Injectable } from "@angular/core";
import { Confirmation, ConfirmationService, MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class AppMessageService {
  loadingText: string = "";

  constructor(
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ShowLoading() {
    this.spinner.show();
  }

  DismissLoading() {
    this.spinner.hide();
  }

  ConfirmPopUp(confimationConfig: Confirmation, callback: Function) {
    this.confirmationService.confirm({
      message: confimationConfig.message,
      header: confimationConfig.header,
      icon: confimationConfig.icon,
      accept: () => callback(true),
      reject: () => callback(false),
    });
  }

  demShowWarnAlert(msg: string) {
    this.demShowAlert("warn", "Warning", msg);
  }
  showSuccessAlert(msg: string) {
    this.showAlert("success", "Success", msg);
  }

  showErrorAlert(msg: string) {
    this.showAlert("error", "Error", msg);
  }

  showInfoAlert(msg: string) {
    this.showAlert("info", "Information", msg);
  }

  showWarnAlert(msg: string) {
    this.showAlert("warn", "Warning", msg);
  }

  private demShowAlert(
    type: "success" | "info" | "warn" | "error",
    summary: "Success" | "Information" | "Warning" | "Error",
    msg: string
  ) {
    this.messageService.add({
      severity: type,
      summary: summary,
      detail: msg,
      life: 3000,
    });
  }

  private showAlert(
    type: "success" | "info" | "warn" | "error",
    summary: "Success" | "Information" | "Warning" | "Error",
    msg: string
  ) {
    this.messageService.add({
      severity: type,
      summary: summary,
      detail: msg,
      life: 3000,
    });
  }
}
