import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { WebcamViewComponent } from "src/app/shared/components/webcam-view/webcam-view.component";
import { WellKnownUploadType } from "src/app/shared/enums/well-known-upload-type.enum";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { PopupService } from "src/app/shared/services/popup.service";
import { AddUserControlFlowService } from "../add-user-control-flow.service";

@Component({
  selector: "app-upload-verifications",
  templateUrl: "./upload-verifications.component.html",
  styleUrls: ["./upload-verifications.component.scss"],
})
export class UploadVerificationsComponent {
  FV = new CommonForm();

  WellKnownUploadType = WellKnownUploadType;

  value: any = { value: 0, label: "Personal", routerLink: "/personal" };
  profileImageUrl: string | ArrayBuffer | null = null;
  uploadImage: any = null;
  selectedProfileImage: File = null;
  userDetail: any;

  nicImageUrl: string | ArrayBuffer | null = null;
  uploadNicImage: any = null;
  selectedNicImage: File = null;

  gsCertificateUrl: string | ArrayBuffer | null = null;
  uploadGsCertificate: any = null;
  selectedGsCertificate: File = null;

  drivingLicenseUrl: string | ArrayBuffer | null = null;
  uploadDrivingLicense: any = null;
  selectedDrivingLicense: File = null;

  sltdaCertificateUrl: string | ArrayBuffer | null = null;
  uploadSltdaCertificate: any = null;
  selectedSltdaCertificate: File = null;

  policeReportUrl: string | ArrayBuffer | null = null;
  uploadPoliceReport: any = null;
  selectedPoliceReport: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private popUpService: PopupService,
    private addUserControlFlowService: AddUserControlFlowService
  ) {
    this.createForm();
  }

  createForm() {
    this.FV.formGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.userDetail = this.addUserControlFlowService.getUserDetail();
    this.setValues();
  }

  setValues() {
    if (this.userDetail?.profileImageUrl) {
      this.profileImageUrl = this.userDetail.profileImageUrl;
    }

    if (this.userDetail?.nicImageUrl) {
      this.nicImageUrl = this.userDetail.nicImageUrl;
    }

    if (this.userDetail?.gsCertificateUrl) {
      this.gsCertificateUrl = this.userDetail.gsCertificateUrl;
    }

    if (this.userDetail?.drivingLicenseUrl) {
      this.drivingLicenseUrl = this.userDetail.drivingLicenseUrl;
    }

    if (this.userDetail?.sltdaCertificateUrl) {
      this.sltdaCertificateUrl = this.userDetail.sltdaCertificateUrl;
    }

    if (this.userDetail?.policeReportUrl) {
      this.policeReportUrl = this.userDetail.policeReportUrl;
    }
  }

  openUploadDialog(uploadType: number) {
    let header = "Capture ";
    switch (uploadType) {
      case WellKnownUploadType.ProfileImage:
        header += "Profile Image";
        break;
      case WellKnownUploadType.NICImage:
        header += "NIC Image";
        break;
      case WellKnownUploadType.GSCertificate:
        header += "GS Certificate";
        break;
      case WellKnownUploadType.DrivingLicense:
        header += "Driving License";
        break;
      case WellKnownUploadType.SLTDACertificate:
        header += "SLTDA Certificate";
        break;
      case WellKnownUploadType.PoliceReport:
        header += "Police Report";
        break;
    }

    this.popUpService
      .OpenModel(WebcamViewComponent, {
        header: header,
        width: "35vw",
        height: "35vh",
      })
      .subscribe((res) => {
        if (res?.isSave) {
          switch (uploadType) {
            case WellKnownUploadType.ProfileImage:
              this.uploadImage = res;
              this.profileImageUrl = res.imageUrl;
              this.selectedProfileImage = res.file;
              break;
            case WellKnownUploadType.NICImage:
              this.uploadNicImage = res;
              this.nicImageUrl = res.imageUrl;
              this.selectedNicImage = res.file;
              break;
            case WellKnownUploadType.GSCertificate:
              this.uploadGsCertificate = res;
              this.gsCertificateUrl = res.imageUrl;
              this.selectedGsCertificate = res.file;
              break;
            case WellKnownUploadType.DrivingLicense:
              this.uploadDrivingLicense = res;
              this.drivingLicenseUrl = res.imageUrl;
              this.selectedDrivingLicense = res.file;
              break;
            case WellKnownUploadType.SLTDACertificate:
              this.uploadSltdaCertificate = res;
              this.sltdaCertificateUrl = res.imageUrl;
              this.selectedSltdaCertificate = res.file;
              break;
            case WellKnownUploadType.PoliceReport:
              this.uploadPoliceReport = res;
              this.policeReportUrl = res.imageUrl;
              this.selectedPoliceReport = res.file;
              break;
          }

          this.addUserControlFlowService.setUploadImage(
            uploadType,
            res.file,
            res.imageUrl
          );
        }
      });
  }

  removeImage(uploadType: number) {
    switch (uploadType) {
      case WellKnownUploadType.ProfileImage:
        this.uploadImage = null;
        this.profileImageUrl = null;
        this.selectedProfileImage = null;
        let userDetails = {
          ...this.userDetail,
          profileImageUrl: "",
        };
        this.addUserControlFlowService.setUserDetail(userDetails);
        break;
      case WellKnownUploadType.NICImage:
        this.uploadNicImage = null;
        this.nicImageUrl = null;
        this.selectedNicImage = null;
        let userDetailsNIC = {
          ...this.userDetail,
          nicImageUrl: "",
        };
        this.addUserControlFlowService.setUserDetail(userDetailsNIC);
        break;
      case WellKnownUploadType.GSCertificate:
        this.uploadGsCertificate = null;
        this.gsCertificateUrl = null;
        this.selectedGsCertificate = null;
        let userDetailsGS = {
          ...this.userDetail,
          gsCertificateUrl: "",
        };
        this.addUserControlFlowService.setUserDetail(userDetailsGS);
        break;
      case WellKnownUploadType.DrivingLicense:
        this.uploadDrivingLicense = null;
        this.drivingLicenseUrl = null;
        this.selectedDrivingLicense = null;
        let userDetailsDL = {
          ...this.userDetail,
          drivingLicenseUrl: "",
        };

        this.addUserControlFlowService.setUserDetail(userDetailsDL);
        break;
      case WellKnownUploadType.SLTDACertificate:
        this.uploadSltdaCertificate = null;
        this.sltdaCertificateUrl = null;
        this.selectedSltdaCertificate = null;
        let userDetailsSLTDA = {
          ...this.userDetail,
          sltdaCertificateUrl: "",
        };
        this.addUserControlFlowService.setUserDetail(userDetailsSLTDA);
        break;
      case WellKnownUploadType.PoliceReport:
        this.uploadPoliceReport = null;
        this.policeReportUrl = null;
        this.selectedPoliceReport = null;
        let userDetailsPR = {
          ...this.userDetail,
          policeReportUrl: "",
        };
        this.addUserControlFlowService.setUserDetail(userDetailsPR);
        break;
    }

    this.addUserControlFlowService.setUploadImage(uploadType, null, "");
  }
}
