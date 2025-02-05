import { CommonForm } from './../../../shared/services/app-common-form';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { reportData } from 'src/app/shared/data/reportData';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { MonthlyTripReportComponent } from '../monthly-trip-report/monthly-trip-report.component';
import { firstValueFrom } from 'rxjs';
import { ReportService } from 'src/app/shared/services/api-services/report.service';
import { DatePipe } from '@angular/common';
import { MonthlyExpensesReportComponent } from '../monthly-expenses-report/monthly-expenses-report.component';
import { MonthlyDriverSalaryComponent } from '../monthly-driver-salary/monthly-driver-salary.component';
import { MonthlyIncomeReportComponent } from '../monthly-income-report/monthly-income-report.component';

@Component({
  selector: 'app-report-navigation-dashboard',
  templateUrl: './report-navigation-dashboard.component.html',
  styleUrls: ['./report-navigation-dashboard.component.css']
})
export class ReportNavigationDashboardComponent implements OnInit {
  reports: any[] = reportData
  activeIndex: number = 0
  FV = new CommonForm()
  constructor(private formBuilder: FormBuilder,
    private messageService: AppMessageService,
    private sidebarService: SidebarService, private reportService: ReportService,
    private datePipe: DatePipe) {
    this.createForm()
  }

  ngOnInit() {
    this.FV.clearValues("month");
    let today = new Date();
    this.FV.setValue("month", today);
  }

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      month: [""],
    });
  }

  activeIndexChange(event: any) {
    this.FV.clearValues("month");
    let today = new Date();
    this.FV.setValue("month", today);
    this.activeIndex = event
  }


  onClickGenerateReport(report) {
    let selectedDate = this.FV.getValue("month")
    let date = this.datePipe.transform(selectedDate, "yyyy-MM");

    switch (report.index) {
      case 0:
        this.openMonthlyTripReport(date);
        break;
      case 1:
        this.openMonthlyExpensesReport(date);
        break;
      case 2:
        this.openMonthlyDriverSalaryReport(date);
        break;
      case 3:
        this.openMonthlyIncomeReport(date);
        break;
    }
  }

  async openMonthlyTripReport(date: string) {
    try {
      let data = {
        reportDetails: [],
        month: date
      }
      const reportResult = await firstValueFrom(this.reportService.GetMonthlyTripReportData(date));

      if (reportResult.IsSuccessful) {
        data.reportDetails = reportResult.Result;
      }

      if (data.reportDetails?.length <= 0) {
        this.messageService.showInfoAlert(`No trip data found for selected month (${date})!`)
        return
      }

      let properties = {
        width: "60vw",
        position: "right",
      };

      this.sidebarService.addComponent(
        "", //Monthly Trip Report
        MonthlyTripReportComponent,
        properties,
        data
      );

    } catch (error) {
      this.messageService.showErrorAlert(error.message || error)
    }
  }

  async openMonthlyExpensesReport(date: string) {
    try {
      let data = {
        reportDetails: [],
        month: date
      }
      const reportResult = await firstValueFrom(this.reportService.GetMonthlyExpensesReportData(date));

      if (reportResult.IsSuccessful) {
        data.reportDetails = reportResult.Result;
      }

      if (data.reportDetails?.length <= 0) {
        this.messageService.showInfoAlert(`No expense data found for selected month (${date})!`)
        return
      }

      let properties = {
        width: "60vw",
        position: "right",
      };

      this.sidebarService.addComponent(
        "", //Monthly Trip Report
        MonthlyExpensesReportComponent,
        properties,
        data
      );
    } catch (error) {
      this.messageService.showErrorAlert(error.message || error)
    }
  }

  async openMonthlyDriverSalaryReport(date: string) {
    try {
      let data = {
        reportDetails: [],
        month: date
      }
      const reportResult = await firstValueFrom(this.reportService.GetMonthlyDriverSalaryReportData(date));

      if (reportResult.IsSuccessful) {
        data.reportDetails = reportResult.Result;
      }

      if (data.reportDetails?.length <= 0) {
        this.messageService.showInfoAlert(`No driver salary data found for selected month (${date})!`)
        return
      }

      let properties = {
        width: "60vw",
        position: "right",
      };

      this.sidebarService.addComponent(
        "", //Monthly Trip Report
        MonthlyDriverSalaryComponent,
        properties,
        data
      );
    } catch (error) {
      this.messageService.showErrorAlert(error.message || error)
    }
  }

  async openMonthlyIncomeReport(date: string) {
    try {
      let data = {
        reportDetails: [],
        month: date
      }
      const reportResult = await firstValueFrom(this.reportService.GetMonthlyIncomeReportData(date));

      if (reportResult.IsSuccessful) {
        data.reportDetails = reportResult.Result;
      }

      if (data.reportDetails?.length <= 0) {
        this.messageService.showInfoAlert(`No income data found for selected month (${date})!`)
        return
      }

      let properties = {
        width: "60vw",
        position: "right",
      };

      this.sidebarService.addComponent(
        "", //Monthly Trip Report
        MonthlyIncomeReportComponent,
        properties,
        data
      );
    } catch (error) {
      this.messageService.showErrorAlert(error.message || error)
    }
  }
}
