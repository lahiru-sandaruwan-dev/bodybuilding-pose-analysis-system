import { DatePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-monthly-driver-salary',
  templateUrl: './monthly-driver-salary.component.html',
  styleUrls: ['./monthly-driver-salary.component.scss']
})
export class MonthlyDriverSalaryComponent {
  @ViewChild("templateRef", { static: true }) templateRef: TemplateRef<any>;
  month = new Date();
  reportDetails: any[] = [];
  cols: any[] = []
  totalSalary: number = 0
  constructor(
    private sidebarService: SidebarService,
    private messageService: AppMessageService,
    private datePipe: DatePipe,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.sidebarService.setFooterTemplate(this.templateRef);
    let sideBarData = this.sidebarService.getData();
    this.month = new Date(sideBarData.month);
    this.reportDetails = sideBarData?.reportDetails;
    this.preprocessData();
    //   {
    //     "tripId": "6744a0a1015702da076cf1e7",
    //     "tripConfirmationNumber": "DK-005",
    //     "driverId": "66bb93d03d93bbb6881f0467",
    //     "driverName": "driver (Geoffrey Mosciski DDS)",
    //     "salaryPerDay": 5000,
    //     "remainingExpenses": 18119.25,
    //     "totalDeduction": 0,
    //     "totalAddition": 0,
    //     "totalSalary": 20000,
    //     "noOfDays": 4,
    //     "isRemainingToDriver": false,
    //     "createdDate": "2024-11-30T07:19:16.970Z",
    //     "createdUser": "nimna (Lauren Crona)",
    //     "updatedDate": "2024-11-30T07:19:16.970Z",
    //     "updatedUser": "nimna (Lauren Crona)"
    // },
    this.cols = [
      { field: 'tripConfirmationNumber', header: 'Trip No' },
      { field: 'driverName', header: 'Driver' },
      { field: 'salaryPerDay', header: 'Salary Per Day' },
      { field: 'totalAddition', header: 'Addition' },
      { field: 'totalDeduction', header: 'Deduction' },
      { field: 'remainingExpenses', header: 'Rem. Expenses' },
      { field: 'showRemainingToDriver', header: 'Rem. To Driver' },
      { field: 'totalSalary', header: 'Salary (LKR)' },
    ]
  }


  preprocessData() {
    if (this.reportDetails?.length > 0) {
      this.reportDetails.map((report: any) => {
        report.showCreatedDate = this.datePipe.transform(report.createdDate, "yyyy-MM-dd h:mm a");
        report.showUpdatedDate = this.datePipe.transform(report.updatedDate, "yyyy-MM-dd h:mm a");
        report.showRemainingToDriver = report?.isRemainingToDriver ? 'Yes' : 'No';
      })

      this.totalSalary = this.reportDetails.reduce((total: number, report: any) => {
        return total += report.totalSalary;
      }, 0);
    }
  }

  exportXls() {
    let cols = [
      { field: 'tripConfirmationNumber', header: 'Trip No' },
      { field: 'driverName', header: 'Driver' },
      { field: 'salaryPerDay', header: 'Salary Per Day' },
      { field: 'totalAddition', header: 'Addition' },
      { field: 'totalDeduction', header: 'Deduction' },
      { field: 'remainingExpenses', header: 'Rem. Expenses' },
      { field: 'showRemainingToDriver', header: 'Rem. To Driver' },
      { field: 'totalSalary', header: 'Salary (LKR)' },
      { field: 'createdUser', header: 'Created By' },
      { field: 'updatedUser', header: 'Last Updated By' },
      { field: 'showCreatedDate', header: 'Created Date' },
      { field: 'showUpdatedDate', header: 'Last Modified Date' },
    ]

    let name = `Driver Salary Report (${this.datePipe.transform(this.month, "yyyy-MM")})`;
    this.excelService.GenerateExcelFileWithCustomHeader(cols, this.reportDetails, name);
  }
}
