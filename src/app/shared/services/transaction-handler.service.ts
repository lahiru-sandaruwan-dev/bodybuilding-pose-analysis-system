import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { DataAccessService } from "./data-access.service";
import { MasterDataService } from "./master-data.service";
import { AppMessageService } from "./app-message.service";
import { ResourceService } from "./resource.service";
import { HelperService } from "./helper.service";

@Injectable()
export class TransactionHandlerService {
  ///Login service count
  TOTAL_SERVICERS_COUNT = 1;
  locations: any[] = [];
  loggedResID: any;

  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}

  // UploadImage(imageStream: any, type: number) {
  //   return this.dataAccess
  //     .UPLOAD_IMAGE(
  //       this.resource.uploadFile.uploadFile + `?type=${type}`,
  //       imageStream
  //     )
  //     .pipe((result) => {
  //       return result;
  //     });
  // }

  // UploadFileToBookingRoom(imageStream: any, bookingRoomId: number) {
  //   return this.dataAccess
  //     .UPLOAD_IMAGE(
  //       this.resource.uploadFile.uploadFileBR +
  //         `?bookingRoomId=${bookingRoomId}`,
  //       imageStream
  //     )
  //     .pipe((result) => {
  //       return result;
  //     });
  // }

  userLogin(body: any) {
    return this.dataAccess
      ._POST(this.resource.auth.login, body)
      .pipe((response) => {
        return response;
      });
  }

  userResetPassword(userId: string) {
    return this.dataAccess
      .PUT(this.resource.auth.resetPassword + `/${userId}`, null)
      .pipe((response) => {
        return response;
      });
  }

  refreshAuthentication(body: any) {
    return this.dataAccess
      .POST(this.resource.auth.refreshAuth, body)
      .pipe((response) => {
        return response;
      });
  }

  changePassword(body: any) {
    return this.dataAccess
      .PUT(this.resource.auth.changePassword, body)
      .pipe((response) => {
        return response;
      });
  }
}
