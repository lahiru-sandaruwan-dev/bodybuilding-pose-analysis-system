import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { PersonalDetailsComponent } from "./personal-details/personal-details.component";
import { BankDetailsComponent } from "./bank-details/bank-details.component";
import { UploadVerificationsComponent } from "./upload-verifications/upload-verifications.component";
import { AddUserControlFlowService } from "./add-user-control-flow.service";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { StoreService } from "../../../../shared/services/api-services/store.service";
import { firstValueFrom } from "rxjs";
import { WellKnownUploadType } from "src/app/shared/enums/well-known-upload-type.enum";
import { UserService } from "src/app/shared/services/api-services/user.service";
import { banks } from "src/app/shared/data/bankData";

@Component({
  selector: "app-add-new-user-form",
  templateUrl: "./add-new-user-form.component.html",
  styleUrls: ["./add-new-user-form.component.scss"],
})
export class AddNewUserFormComponent {
  @ViewChild("templateRef", { static: true }) templateRef: TemplateRef<any>;
  @ViewChild(PersonalDetailsComponent)
  private pdc!: PersonalDetailsComponent;
  @ViewChild(BankDetailsComponent)
  private bdc!: BankDetailsComponent;
  @ViewChild(UploadVerificationsComponent)
  private uvc!: UploadVerificationsComponent;

  activeIndex: any = 0;
  items: MenuItem[];
  value: any = { value: 0, label: "Personal" };
  showingIndex: number = 0;
  userDetail: any;
  uploadedImages: any;
  isEdit: boolean = false;
  constructor(
    private sidebarService: SidebarService,
    private addUserControlFlowService: AddUserControlFlowService,
    private messageService: AppMessageService,
    private storeService: StoreService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let sideBarData = this.sidebarService.getData();
    this.sidebarService.setFooterTemplate(this.templateRef);
    if (sideBarData) {
      this.isEdit = sideBarData.isEdit;
      if (this.isEdit) {
        this.addUserControlFlowService.setStepValue(0, true);
        this.addUserControlFlowService.setStepValue(1, true);
        this.addUserControlFlowService.setStepValue(2, true);
      }
    }

    this.items = [
      {
        value: 0,
        label: "Personal",
      },
      {
        value: 1,
        label: "Bank Details",
      },
      {
        value: 2,
        label: "Upload",
      },
    ];
  }

  handleClick(index: number): void {
    ;
    let isStepCompleted = this.addUserControlFlowService.getStepValue(
      index
    ) as boolean;

    // isStepCompleted = true;

    if (isStepCompleted) {
      this.showingIndex = index;
    } else {
      return;
    }
  }

  handleSave(index: number): void {
    ;
    switch (index) {
      case 0:
        this.savePersonalDetails();
        break;
      case 1:
        this.saveBankDetails();
        break;
      case 2:
        this.saveUpload();
        break;
      default:
        this.showingIndex = 0 + 1;
    }
  }

  async savePersonalDetails() {
    try {
      ;
      let data = this.pdc.FV.formGroup.value;
      this.userDetail = this.addUserControlFlowService.getUserDetail();
      let role = this.pdc.FV.getValue("role");
      if (
        this.pdc.FV.validateControllers(
          "fullName,userName,gender,dateOfBirth,address,nicNo,number1,email,role"
        )
      ) {
        return;
      }

      if (role === 2) {
        if (this.pdc.FV.validateControllers("basicSalary,leaveCount")) {
          return;
        }
      } else if (role === 3) {
        if (this.pdc.FV.validateControllers("languages")) {
          return;
        }
      }

      let formData = this.pdc.FV.formGroup.value;

      const userNameCheckResult = await firstValueFrom(
        this.userService.checkUserNameExist(
          formData.userName,
          this.userDetail?._id ?? "",
          formData?.email ?? "",
          formData?.nicNo ?? ""
        )
      );

      if (userNameCheckResult.IsSuccessful) {
        if (!userNameCheckResult.Result) {
          this.messageService.showErrorAlert(userNameCheckResult.Message);
          return;
        }
      } else {
        this.messageService.showErrorAlert(userNameCheckResult.Message);
        return;
      }

      this.userDetail = {
        ...this.userDetail,
        fullName: formData.fullName,
        userName: formData.userName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        nic: formData.nicNo,
        phoneNumber1: formData.number1,
        phoneNumber2: formData.number2,
        email: formData.email,
        basicSalary: formData.basicSalary,
        leaveCount: formData.leaveCount,
        languages: formData.languages,
        role: formData.role,
      };

      this.addUserControlFlowService.setUserDetail(this.userDetail);
      this.addUserControlFlowService.setStepValue(0, true);

      this.showingIndex = 0 + 1;
    } catch (error) {
      this.messageService.showErrorAlert(error);
    }
  }

  saveBankDetails() {
    if (
      this.bdc.FV.validateControllers(
        "bankName,branchName,accNumber,accHolderName,accHolderAddress"
      )
    ) {
      return;
    }

    let formData = this.bdc.FV.formGroup.value;
    this.userDetail = {
      ...this.userDetail,
      bankName: banks.find((x) => x.id == formData.bankName)?.name,
      bankId: formData.bankName,
      branch: formData.branchName,
      accountNumber: formData.accNumber,
      accountHolderName: formData.accHolderName,
      accountHolderAddress: formData.accHolderAddress,
    };

    this.addUserControlFlowService.setUserDetail(this.userDetail);
    this.addUserControlFlowService.setStepValue(1, true);

    this.showingIndex = 1 + 1;
  }

  async saveUpload() {
    try {
      this.uploadedImages = this.addUserControlFlowService.getUploadImage();
      this.userDetail = this.addUserControlFlowService.getUserDetail();
      let profileImageResult = null;
      let nicImageResult = null;
      let gsCertificateResult = null;
      let drivingLicenseResult = null;
      let sltdaCertificateResult = null;
      let policeReportResult = null;

      if (this.uploadedImages.selectedProfileImage) {
        profileImageResult = await firstValueFrom(
          this.storeService.UploadImage(
            this.uploadedImages.selectedProfileImage,
            WellKnownUploadType.ProfileImage
          )
        );
      }

      if (this.uploadedImages.selectedNicImage) {
        nicImageResult = await firstValueFrom(
          this.storeService.UploadImage(
            this.uploadedImages.selectedNicImage,
            WellKnownUploadType.NICImage
          )
        );
      }

      if (this.uploadedImages.selectedGsCertificate) {
        gsCertificateResult = await firstValueFrom(
          this.storeService.UploadImage(
            this.uploadedImages.selectedGsCertificate,
            WellKnownUploadType.GSCertificate
          )
        );
      }

      if (this.uploadedImages.selectedDrivingLicense) {
        drivingLicenseResult = await firstValueFrom(
          this.storeService.UploadImage(
            this.uploadedImages.selectedDrivingLicense,
            WellKnownUploadType.DrivingLicense
          )
        );
      }

      if (this.uploadedImages.selectedSltdaCertificate) {
        sltdaCertificateResult = await firstValueFrom(
          this.storeService.UploadImage(
            this.uploadedImages.selectedSltdaCertificate,
            WellKnownUploadType.SLTDACertificate
          )
        );
      }

      if (this.uploadedImages.selectedPoliceReport) {
        policeReportResult = await firstValueFrom(
          this.storeService.UploadImage(
            this.uploadedImages.selectedPoliceReport,
            WellKnownUploadType.PoliceReport
          )
        );
      }

      this.userDetail = {
        ...this.userDetail,
        profileImageUrl:
          profileImageResult?.Result ?? this.userDetail.profileImageUrl,
        nicImageUrl: nicImageResult?.Result ?? this.userDetail.nicImageUrl,
        gsCertificateUrl:
          gsCertificateResult?.Result ?? this.userDetail.gsCertificateUrl,
        drivingLicenseUrl:
          drivingLicenseResult?.Result ?? this.userDetail.drivingLicenseUrl,
        sltdaCertificateUrl:
          sltdaCertificateResult?.Result ?? this.userDetail.sltdaCertificateUrl,
        policeReportUrl:
          policeReportResult?.Result ?? this.userDetail.policeReportUrl,
      };

      if (!this.isEdit) {
        this.userService.saveUser(this.userDetail).subscribe((result) => {
          if (result.IsSuccessful) {
            this.messageService.showSuccessAlert(result.Message);
            this.addUserControlFlowService.resetData();
            this.sidebarService.sidebarEvent.emit(true);
          } else {
            this.messageService.showErrorAlert(result.Message);
          }
        });
      } else {
        this.userService
          .updateUserDetails(this.userDetail._id, this.userDetail)
          .subscribe((result) => {
            if (result.IsSuccessful) {
              this.messageService.showSuccessAlert(result.Message);
              this.addUserControlFlowService.resetData();
              this.sidebarService.sidebarEvent.emit(true);
            } else {
              this.messageService.showErrorAlert(result.Message);
            }
          });
      }
    } catch (error) {
      this.messageService.showErrorAlert(error);
    }
  }

  async handleUpdate(index: number) {
    if (index == 0) {
      let data = this.pdc.FV.formGroup.value;
      this.userDetail = this.addUserControlFlowService.getUserDetail();
      let role = this.pdc.FV.getValue("role");
      if (
        this.pdc.FV.validateControllers(
          "fullName,userName,gender,dateOfBirth,address,nicNo,number1,email,role"
        )
      ) {
        return;
      }

      if (role === 2) {
        if (this.pdc.FV.validateControllers("basicSalary,leaveCount")) {
          return;
        }
      } else if (role === 3) {
        if (this.pdc.FV.validateControllers("languages")) {
          return;
        }
      }

      let formData = this.pdc.FV.formGroup.value;

      const userNameCheckResult = await firstValueFrom(
        this.userService.checkUserNameExist(
          formData.userName,
          this.userDetail?._id ?? "",
          formData?.email ?? "",
          formData?.nicNo ?? ""
        )
      );

      if (userNameCheckResult.IsSuccessful) {
        if (!userNameCheckResult.Result) {
          this.messageService.showErrorAlert(userNameCheckResult.Message);
          return;
        }
      } else {
        this.messageService.showErrorAlert(userNameCheckResult.Message);
        return;
      }

      this.userDetail = {
        ...this.userDetail,
        fullName: formData.fullName,
        userName: formData.userName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        nic: formData.nicNo,
        phoneNumber1: formData.number1,
        phoneNumber2: formData.number2,
        email: formData.email,
        basicSalary: formData.basicSalary,
        leaveCount: formData.leaveCount,
        languages: formData.languages,
        role: formData.role,
      };

      this.addUserControlFlowService.setUserDetail(this.userDetail);

      this.userService
        .updateUserDetails(this.userDetail._id, this.userDetail)
        .subscribe((result) => {
          if (result.IsSuccessful) {
            this.messageService.showSuccessAlert(result.Message);
            this.addUserControlFlowService.resetData();
            this.sidebarService.sidebarEvent.emit(true);
          } else {
            this.messageService.showErrorAlert(result.Message);
          }
        });
    } else if (index == 1) {
      this.userDetail = this.addUserControlFlowService.getUserDetail();
      if (
        this.bdc.FV.validateControllers(
          "bankName,branchName,accNumber,accHolderName,accHolderAddress"
        )
      ) {
        return;
      }

      let formData = this.bdc.FV.formGroup.value;
      this.userDetail = {
        ...this.userDetail,
        bankName: banks.find((x) => x.id == formData.bankName)?.name,
        bankId: formData.bankName,
        branch: formData.branchName,
        accountNumber: formData.accNumber,
        accountHolderName: formData.accHolderName,
        accountHolderAddress: formData.accHolderAddress,
      };

      this.addUserControlFlowService.setUserDetail(this.userDetail);

      this.userService
        .updateUserDetails(this.userDetail._id, this.userDetail)
        .subscribe((result) => {
          if (result.IsSuccessful) {
            this.messageService.showSuccessAlert(result.Message);
            this.addUserControlFlowService.resetData();
            this.sidebarService.sidebarEvent.emit(true);
          } else {
            this.messageService.showErrorAlert(result.Message);
          }
        });
    }
  }

  handleCancel() {
    this.sidebarService.sidebarEvent.emit(false);
  }
}
