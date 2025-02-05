import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';


@Component({
  selector: 'app-monthly-income-report',
  templateUrl: './monthly-income-report.component.html',
  styleUrls: ['./monthly-income-report.component.css']
})
export class MonthlyIncomeReportComponent implements OnInit {
  @ViewChild("templateRef", { static: true }) templateRef: TemplateRef<any>;
  month = new Date();
  reportDetails: any[] = [];
  cols: any[] = []
  totalIncome: number = 0
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
      { field: 'showStartDate', header: 'Start Date' },
      { field: 'showEndDate', header: 'End Date' },
      { field: 'totalCost', header: 'Trip Cost (USD)' },
      { field: 'totalCostLocalCurrency', header: 'Trip Cost (LKR)' },
      { field: 'estimatedExpense', header: 'Estimated Expenses (LKR)' },
      { field: 'totalExpense', header: 'Expenses (LKR)' },
      { field: 'remainingExpenses', header: 'Rem. Expenses (LKR)' },
      { field: 'showRemainingToDriver', header: 'Rem. To Driver' },
      { field: 'totalDriverSalary', header: 'Salary (LKR)' },
      { field: 'tripIncome', header: 'Income (LKR)' },
    ]


  }


  preprocessData() {
    if (this.reportDetails?.length > 0) {
      this.reportDetails.map((report: any) => {
        report.showStartDate = this.datePipe.transform(report.startDate, "yyyy-MM-dd");
        report.showEndDate = this.datePipe.transform(report.endDate, "yyyy-MM-dd");
        report.showRemainingToDriver = report?.isRemainingToDriver ? 'Yes' : 'No';
      })

      this.totalIncome = this.reportDetails.reduce((total: number, report: any) => {
        return total += report.tripIncome;
      }, 0);
    }
  }

  exportXls() {
    let cols = [
      { field: 'confirmationNumber', header: 'Trip No' },
      { field: 'showStartDate', header: 'Start Date' },
      { field: 'showEndDate', header: 'End Date' },
      { field: 'totalCost', header: 'Trip Cost (USD)' },
      { field: 'totalCostLocalCurrency', header: 'Trip Cost (LKR)' },
      { field: 'estimatedExpense', header: 'Estimated Expenses (LKR)' },
      { field: 'totalExpense', header: 'Expenses (LKR)' },
      { field: 'remainingExpenses', header: 'Rem. Expenses (LKR)' },
      { field: 'showRemainingToDriver', header: 'Rem. To Driver' },
      { field: 'totalDriverSalary', header: 'Salary (LKR)' },
      { field: 'tripIncome', header: 'Income (LKR)' },
    ]

    let name = `Income Report (${this.datePipe.transform(this.month, "yyyy-MM")})`;
    this.excelService.GenerateExcelFileWithCustomHeader(cols, this.reportDetails, name);
  }
}
