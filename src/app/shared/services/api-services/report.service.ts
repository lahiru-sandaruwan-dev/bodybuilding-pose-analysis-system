import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private dataAccess: DataAccessService,
    private resource: ResourceService) { }

  GetMonthlyTripReportData(date: string) {
    return this.dataAccess
      .GET(this.resource.report.monthlyTripReport + `?date=${date}`)
      .pipe((response) => {
        return response;
      });
  }

  GetMonthlyExpensesReportData(date: string) {
    return this.dataAccess
      .GET(this.resource.report.monthlyExpensesReport + `?date=${date}`)
      .pipe((response) => {
        return response;
      });
  }

  GetMonthlyDriverSalaryReportData(date: string) {
    return this.dataAccess
      .GET(this.resource.report.monthlyDriverSalary + `?date=${date}`)
      .pipe((response) => {
        return response;
      });
  }

  GetMonthlyIncomeReportData(date: string) {
    return this.dataAccess
      .GET(this.resource.report.monthlyIncomeReport + `?date=${date}`)
      .pipe((response) => {
        return response;
      });
  }
}
