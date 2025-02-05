import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}

  GetCommonDataByType(type: string) {
    return this.dataAccess
      .GET(this.resource.common.getDataByType + `?type=${type}`)
      .pipe((response) => {
        return response;
      });
  }

  GetGenderList() {
    return this.dataAccess
      .GET(this.resource.common.getGenders)
      .pipe((response) => {
        return response;
      });
  }
}
