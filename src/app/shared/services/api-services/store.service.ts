import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}

  UploadImage(body: any, type: number) {
    var formData = new FormData();
    formData.append("file", body);
    return this.dataAccess
      .POST(this.resource.store.uploadFile + `?type=${type}`, formData)
      .pipe((response) => {
        return response;
      });
  }

  UploadMultipleImages(body: any[], type: number) {
    var formData = new FormData();
    body.forEach((element) => {
      formData.append("file", element);
    });

    return this.dataAccess
      .POST(this.resource.store.uploadMultipleFiles + `?type=${type}`, formData)
      .pipe((response) => {
        return response;
      });
  }
}
