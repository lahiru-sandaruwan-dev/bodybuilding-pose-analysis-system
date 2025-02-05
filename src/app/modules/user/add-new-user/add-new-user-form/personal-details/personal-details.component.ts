import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { languages } from "../../../../../shared/data/languages";
import { userRoles } from "src/app/shared/data/useRoles";
import { genders } from "src/app/shared/data/commonData";
import { AddUserControlFlowService } from "../add-user-control-flow.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-personal-details",
  templateUrl: "./personal-details.component.html",
  styleUrls: ["./personal-details.component.scss"],
})
export class PersonalDetailsComponent {
  FV = new CommonForm();
  genderArr = genders;
  roleArr = userRoles;
  languagesArr = languages;
  showAdmin = false;
  showDriver = false;
  userDetail: any;
  minDate: string = "";
  maxDate: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private addUserControlFlowService: AddUserControlFlowService,
    private datePipe: DatePipe
  ) {
    this.createForm();
  }

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      fullName: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      address: ["", [Validators.required]],
      nicNo: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))/gm
          ),
        ],
      ],
      number1: ["", [Validators.required]],
      number2: [""],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          ),
        ],
      ],
      basicSalary: ["", [Validators.required]],
      leaveCount: [
        "",
        [Validators.required, Validators.min(1), Validators.max(30)],
      ],
      languages: [[], [Validators.required]],
      role: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userDetail = this.addUserControlFlowService.getUserDetail();
    this.setValues();

    // set min and max date for date of birth to more than 18 years old - 60 years old
    this.minDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() - 60)),
      "yyyy-MM-dd"
    );
    this.maxDate = this.datePipe.transform(
      new Date().setFullYear(new Date().getFullYear() - 18),
      "yyyy-MM-dd"
    );
  }

  setValues() {
    ;
    this.FV.setValue("fullName", this.userDetail?.fullName);
    this.FV.setValue("userName", this.userDetail?.userName);
    this.FV.setValue("gender", this.userDetail?.gender);
    this.FV.setValue(
      "dateOfBirth",
      this.datePipe.transform(this.userDetail?.dateOfBirth, "yyyy-MM-dd")
    );
    this.FV.setValue("address", this.userDetail?.address);
    this.FV.setValue("nicNo", this.userDetail?.nic);
    this.FV.setValue("number1", this.userDetail?.phoneNumber1);
    this.FV.setValue("number2", this.userDetail?.phoneNumber2);
    this.FV.setValue("email", this.userDetail?.email);
    this.FV.setValue("basicSalary", this.userDetail?.basicSalary);
    this.FV.setValue("leaveCount", this.userDetail?.leaveCount);

    // cover langualges array to integer array
    let languages: any[] = this.userDetail?.languages;
    if (languages.length > 0) {
      this.userDetail.languages = languages.map((language: any) => {
        return parseInt(language);
      });
    }
    this.FV.setValue("languages", this.userDetail?.languages);
    this.FV.setValue("role", this.userDetail?.role);
    this.onRoleChange();
  }

  onRoleChange() {
    let role = this.FV.getValue("role");

    if (role === 2 || role === 4 || role === 5) {
      this.showAdmin = true;
      this.showDriver = false;
    } else if (role === 3) {
      this.showDriver = true;
      this.showAdmin = false;
    } else {
      this.showAdmin = false;
      this.showDriver = false;
    }
  }
}
