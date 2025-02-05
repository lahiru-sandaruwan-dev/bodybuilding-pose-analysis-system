import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { MasterDataService } from "./master-data.service";

@Injectable({
  providedIn: "root",
})
export class DataAccessService {
  public Request: BehaviorSubject<number> = new BehaviorSubject(0);
  private RequestCount = 0;

  constructor(
    private http: HttpClient,
    private masterData: MasterDataService
  ) {}

  GET(url: string, spinner = true): Observable<AppResponse> {
    let responseModel = new AppResponse();
    if (spinner) {
      this.Request.next(++this.RequestCount);
    }

    let headers = new HttpHeaders().set(
      "Authorization",
      this.masterData.SessionKey
    );
    return this.http.get<AppResponse>(url, { headers }).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  POST(url: string, body: any, spinner = true): Observable<AppResponse> {
    let responseModel = new AppResponse();
    if (spinner) {
      this.Request.next(++this.RequestCount);
    }

    let headers = new HttpHeaders().set(
      "Authorization",
      this.masterData.SessionKey
    );

    return this.http.post<AppResponse>(url, body, { headers }).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }

        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  PATCH(url: string, body: any, spinner = true): Observable<AppResponse> {
    let responseModel = new AppResponse();
    if (spinner) {
      this.Request.next(++this.RequestCount);
    }

    let headers = new HttpHeaders().set(
      "Authorization",
      this.masterData.SessionKey
    );
    return this.http.patch<AppResponse>(url, body, { headers }).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  PUT(url: string, body: any, spinner = true): Observable<AppResponse> {
    let responseModel = new AppResponse();

    if (spinner) {
      this.Request.next(++this.RequestCount);
    }

    let headers = new HttpHeaders().set(
      "Authorization",
      this.masterData.SessionKey
    );
    return this.http.put<AppResponse>(url, body, { headers }).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  DELETE(url: string, spinner = true): Observable<AppResponse> {
    let responseModel = new AppResponse();
    if (spinner) {
      this.Request.next(++this.RequestCount);
    }

    let headers = new HttpHeaders().set(
      "Authorization",
      this.masterData.SessionKey
    );
    return this.http.delete<AppResponse>(url, { headers }).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  _POST(url: string, body: any, spinner = true): Observable<AppResponse> {
    let responseModel = new AppResponse();
    if (spinner) {
      this.Request.next(++this.RequestCount);
    }
    return this.http.post<AppResponse>(url, body).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  _GET(url: string, spinner = true): Observable<AppResponse> {
    let responseModel = new AppResponse();
    if (spinner) {
      this.Request.next(++this.RequestCount);
    }
    return this.http.get<AppResponse>(url).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  UPLOAD_IMAGE(url: string, params: any, spinner = true) {
    let responseModel = new AppResponse();

    if (spinner) {
      this.Request.next(++this.RequestCount);
    }

    let headers = new HttpHeaders().set(
      "Authorization",
      this.masterData.SessionKey
    );

    return this.http.post<AppResponse>(url, params, { headers }).pipe(
      map((response) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }
        return this.mapToAppResponse(response);
      }),
      catchError((error) => {
        if (spinner) {
          this.Request.next(--this.RequestCount);
        }

        responseModel = this.mapToAppResponse(error.error);
        return of(responseModel);
      })
    );
  }

  private mapToAppResponse(response: any) {
    let result = new AppResponse();
    result.IsSuccessful = response.isSuccessful;
    result.TimeStamp = response.timeStamp;
    result.StatusCode = response.statusCode;
    result.Message = response.message ? response.message : "";
    result.Result = response.data;
    return result;
  }
}

export class AppResponse {
  IsSuccessful = false;
  TimeStamp: any;
  Message: any;
  StatusCode: any;
  Result: any;
}
