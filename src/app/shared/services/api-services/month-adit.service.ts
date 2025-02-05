import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class MonthAditService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}

  GetMonthAditLeaveData() {
    return this.dataAccess
      .GET(this.resource.monthAudit.getPendingLeaves)
      .pipe((response) => {
        return response;
      });
  }

  CreateNewMonth(body: any) {
    return this.dataAccess
      .POST(this.resource.monthAudit.createNewMonth, body)
      .pipe((response) => {
        return response;
      });
  }

  GetWorkingInformation() {
    return this.dataAccess
      .GET(this.resource.monthAudit.getWorkingInfo)
      .pipe((response) => {
        return response;
      });
  }

  GetPendingTrips() {
    return this.dataAccess
      .GET(this.resource.monthAudit.getPendingTrips)
      .pipe((response) => {
        return response;
      });
  }
}
