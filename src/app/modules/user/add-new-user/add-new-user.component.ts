import { Component, TemplateRef, ViewChild } from "@angular/core";
import { AddNewUserFormComponent } from "./add-new-user-form/add-new-user-form.component";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { AppComponent } from "src/app/app.component";
import { PopupService } from "src/app/shared/services/popup.service";
import { Router } from "@angular/router";
import { AddUserControlFlowService } from "./add-new-user-form/add-user-control-flow.service";
import { UserService } from "src/app/shared/services/api-services/user.service";
import { firstValueFrom } from "rxjs";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";
import { languages } from "../../../shared/data/languages";
import { ExcelService } from "../../../shared/services/excel.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-add-new-user",
  templateUrl: "./add-new-user.component.html",
  styleUrls: ["./add-new-user.component.scss"],
})
export class AddNewUserComponent {
  cols: any;
  recodes: any;
  loading: any;
  sidebarVisible2: boolean = false;
  template: TemplateRef<any>;
  items: any[];
  filteredItems: any[];
  constructor(
    private sidebarService: SidebarService,
    private appComponent: AppComponent,
    private popupService: PopupService,
    private router: Router,
    private addUserControlFlowService: AddUserControlFlowService,
    private userService: UserService,
    private messageService: AppMessageService,
    private transactionService: TransactionHandlerService,
    private excelService: ExcelService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "fullName", header: "Full Name" },
      { field: "userName", header: "User Name" },
      { field: "address", header: "Address" },
      { field: "nic", header: "NIC" },
      { field: "email", header: "Email" },
      { field: "phoneNumber1", header: "Phone" },
      { field: "phoneNumber2", header: "Phone 2" },
      { field: "roleName", header: "Role" },
    ];

    this.getAllUsers();

    this.sidebarService.sidebarEvent.subscribe((response) => {
      if (response) {
        this.getAllUsers();
      }

      this.sidebarService.removeComponent();
      this.appComponent.sidebarVisible = false;
      this.addUserControlFlowService.resetData();
    });

    this.items = [
      {
        id: 1,
        label: "Edit User",
        icon: "pi pi-pencil",
        command: (event: any) => {
          this.onClickEdit(event.item.data);
        },
      },
      {
        id: 5,
        label: "Reset Password",
        icon: "pi pi-refresh",
        command: (event: any) => {
          this.resetUserPassword(event.item.data);
        },
      },
      {
        id: 2,
        label: "Delete User",
        icon: "pi pi-trash",
        command: (event: any) => {
          this.deleteUserById(event.item.data);
        },
      },
      {
        id: 3,
        label: "Block User",
        icon: "pi pi-ban",
        command: (event: any) => {
          this.blockUnblockUser(1, event.item.data);
        },
      },
      {
        id: 4,
        label: "Unblock User",
        icon: "pi pi-check-circle",
        command: (event: any) => {
          this.blockUnblockUser(2, event.item.data);
        },
      },
    ];
  }

  toggleMenu(menu: any, event: any, rowData: any) {
    this.filteredItems = [];

    this.filteredItems = this.items.filter((menuItem: any) => {
      if (rowData?.isBlackListed && menuItem.id === 3) {
        return false;
      } else if (!rowData?.isBlackListed && menuItem.id === 4) {
        return false;
      } else {
        return true;
      }
    });

    this.filteredItems.forEach((menuItem) => {
      menuItem.data = rowData;
    });
    menu.toggle(event);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      if (response.IsSuccessful) {
        this.recodes = response.Result;
      }
    });
  }

  onClickAddNew() {
    let data = {
      userData: null,
      isEdit: false,
    };

    this.addUserControlFlowService.resetData();

    let properties = {
      width: "50vw",
      position: "right",
    };

    this.sidebarService.addComponent(
      "Add New User",
      AddNewUserFormComponent,
      properties,
      data
    );
  }

  async onClickEdit(rowData: any) {
    let data = {
      userData: null,
      isEdit: true,
    };

    const userResult = await firstValueFrom(
      this.userService.getUserById(rowData._id)
    );

    if (userResult.IsSuccessful) {
      data.userData = userResult.Result;
      this.addUserControlFlowService.setUserDetail(data.userData);
    }

    let properties = {
      width: "50vw",
      position: "right",
    };

    this.sidebarService.addComponent(
      "Edit User",
      AddNewUserFormComponent,
      properties,
      data
    );
  }

  blockUnblockUser(type: number, rowData: any) {
    let confirmationConfig = {
      message: `Are you sure you want to ${type == 1 ? "block" : "unblock"
        } this user?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          if (type == 1) {
            this.userService
              .blockUserById(rowData._id)
              .subscribe((response) => {
                if (response.IsSuccessful) {
                  this.messageService.showSuccessAlert(response.Message);
                  this.getAllUsers();
                } else {
                  this.messageService.showErrorAlert(response.Message);
                }
              });
          } else {
            this.userService
              .unblockUserById(rowData._id)
              .subscribe((response) => {
                if (response.IsSuccessful) {
                  this.messageService.showSuccessAlert(response.Message);
                  this.getAllUsers();
                } else {
                  this.messageService.showErrorAlert(response.Message);
                }
              });
          }
        }
      }
    );
  }

  resetUserPassword(rowData: any) {
    let confirmationConfig = {
      message: `Are you sure you want to reset this user password to default password?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.transactionService
            .userResetPassword(rowData._id)
            .subscribe((response) => {
              if (response.IsSuccessful) {
                this.messageService.showSuccessAlert(response.Message);
                this.getAllUsers();
              } else {
                this.messageService.showErrorAlert(response.Message);
              }
            });
        }
      }
    );
  }

  deleteUserById(rowData: any) {
    let confirmationConfig = {
      message: `Are you sure you want to delete this user?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
    };

    this.messageService.ConfirmPopUp(
      confirmationConfig,
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.userService
            .deleteUserByUserId(rowData._id)
            .subscribe((response) => {
              if (response.IsSuccessful) {
                this.messageService.showSuccessAlert(response.Message);
                this.getAllUsers();
              } else {
                this.messageService.showErrorAlert(response.Message);
              }
            });
        }
      }
    );
  }

  exportToExcel() {
    let reportCols = [
      { field: "fullName", header: "Full Name" },
      { field: "userName", header: "User Name" },
      { field: "genderName", header: "Gender" },
      { field: "address", header: "Address" },
      { field: "nic", header: "NIC" },
      { field: "email", header: "Email" },
      { field: "phoneNumber1", header: "Phone" },
      { field: "phoneNumber2", header: "Phone 2" },
      { field: "bankName", header: "Bank Name" },
      { field: "branch", header: "Branch" },
      { field: "accountNumber", header: "Account Number" },
      { field: "accountHolderName", header: "Account Holder Name" },
      { field: "accountHolderAddress", header: "Account Holder Address" },
      { field: "basicSalary", header: "Basic Salary" },
      { field: "leaveCount", header: "Leave Count" },
      { field: "isBlackListed", header: "Is Black Listed" },
      { field: "languageNames", header: "Languages" },
      { field: "roleName", header: "Role" },
      { field: "createdUser", header: "Created User" },
      { field: "updatedUser", header: "Last Updated User" },
      { field: "createdAt", header: "Created Date" },
      { field: "updatedAt", header: "Last Updated Date" },
    ];

    let excelData: any[] = [];
    ;
    this.recodes.forEach((item: any) => {
      let languageNames: string = "";
      if (item.languages?.length > 0) {
        item.languages.forEach((lang: any) => {
          let lData = languages.find((l: any) => l.id == Number(lang));
          if (lData) {
            languageNames += lData.englishName + " " + lData.name + ", ";
          }
        });
      }
      let obj = {
        fullName: item.fullName,
        userName: item.userName,
        genderName: item.genderName,
        address: item.address,
        nic: item.nic,
        email: item.email,
        phoneNumber1: item.phoneNumber1,
        phoneNumber2: item.phoneNumber2,
        bankName: item.bankName,
        branch: item.branch,
        accountNumber: item.accountNumber,
        accountHolderName: item.accountHolderName,
        accountHolderAddress: item.accountHolderAddress,
        basicSalary: item.basicSalary,
        leaveCount: item.leaveCount,
        isBlackListed: item.isBlackListed ? "Yes" : "No",
        languageNames: languageNames.slice(0, -2),
        roleName: item.roleName,
        createdUser: item.createdUser,
        updatedUser: item.updatedUser,
        createdAt: this.datePipe.transform(
          item.createdAt,
          "dd/MM/yyyy HH:mm:ss"
        ),
        updatedAt: this.datePipe.transform(
          item.updatedAt,
          "dd/MM/yyyy HH:mm:ss"
        ),
      };

      excelData.push(obj);
    });

    this.excelService.GenerateExcelFileWithCustomHeader(
      reportCols,
      excelData,
      "Users"
    );
  }
}
