import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ClientIpHandleService {
  constructor(private http: HttpClient) {}

  getClientIp() {
    return this.http.get("http://api.ipify.org/?format=json");
  }
}
