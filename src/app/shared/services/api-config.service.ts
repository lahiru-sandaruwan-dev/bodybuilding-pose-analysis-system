import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  constructor(private http: HttpClient) { }

  public getConfigJSON() {
    return this.http.get("assets/config.json");
  }

  public getDriverTasksJSON() {
    return this.http.get("assets/driver-task.json")
  }
}
