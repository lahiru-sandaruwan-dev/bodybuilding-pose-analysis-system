import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { TransactionHandlerService } from "src/app/shared/services/transaction-handler.service";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { Router } from "@angular/router";
import { AppMessageService } from "src/app/shared/services/app-message.service";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private transactionHandler: TransactionHandlerService,
    private masterData: MasterDataService,
    private router: Router,
    private messageService: AppMessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => err);
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    this.messageService.showErrorAlert(
      "Your session has expired. Please login again."
    );

    this.masterData.clearLoginData();
    this.router.navigate(["/login"]);
    return next.handle(req);
    // return this.transactionHandler.RefreshToken(body).pipe(
    //   switchMap((data: any) => {
    //     return next.handle(req);
    //   }),
    //   catchError((err) => {
    //     return throwError(() => {
    //       this.router.navigate(["/login"]);
    //       this.masterData.clearLoginData();
    //       return;
    //     });
    //   })
    // );
  }
}
