import { DatePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-monthly-expenses-report',
  templateUrl: './monthly-expenses-report.component.html',
  styleUrls: ['./monthly-expenses-report.component.scss']
})
export class MonthlyExpensesReportComponent {
  @ViewChild("templateRef", { static: true }) templateRef: TemplateRef<any>;
  month = new Date();
  reportDetails: any[] = [];
  cols: any[] = []
  totalExpenses: number = 0;

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
    this.cols = [
      { field: 'confirmationNumber', header: 'Trip No' },
      { field: 'typeName', header: 'Type' },
      { field: 'showDate', header: 'Date' },
      { field: 'description', header: 'Description' },
      { field: 'createdUser', header: 'User' },
      { field: 'amount', header: 'Amount (LKR)' },
    ]
  }

  preprocessData() {
    if (this.reportDetails?.length > 0) {
      this.reportDetails.map((report: any) => {
        report.showDate = this.datePipe.transform(report.date, "yyyy-MM-dd");
        report.showCreatedDate = this.datePipe.transform(report.createdDate, "yyyy-MM-dd h:mm a");
        report.showUpdatedDate = this.datePipe.transform(report.updatedDate, "yyyy-MM-dd h:mm a");
      })

      this.totalExpenses = this.reportDetails.reduce((total: number, report: any) => {
        return total += report.amount;
      }, 0);
    }
  }

  exportXls() {
    let cols = [
      { field: 'confirmationNumber', header: 'Trip No' },
      { field: 'typeName', header: 'Type' },
      { field: 'showDate', header: 'Date' },
      { field: 'description', header: 'Description' },
      { field: 'amount', header: 'Amount (LKR)' },
      { field: 'createdUser', header: 'Created By' },
      { field: 'updatedUser', header: 'Last Updated By' },
      { field: 'showCreatedDate', header: 'Created Date' },
      { field: 'showUpdatedDate', header: 'Last Modified Date' },
    ]

    let name = `Expenses Report (${this.datePipe.transform(this.month, "yyyy-MM")})`;
    this.excelService.GenerateExcelFileWithCustomHeader(cols, this.reportDetails, name);
  }
}
