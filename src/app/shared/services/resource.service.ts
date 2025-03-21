import { Injectable } from "@angular/core";
import { get } from "jquery";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ResourceService {
  constructor() {}

  private host: string = environment.apiURL;

  private Auth = this.host + "/auth";

  private AnalyzePose = this.host + "/analyze_pose";

  auth = {
    login: this.host + "/login",
    signUp: this.host + "/signup",
    resetPassword: this.Auth + "/resetPassword",
    changePassword: this.Auth + "/changePassword",
    refreshAuth: this.Auth + "/refreshAuth",
  };

  posesAnalysis = {
    frontDoubleBicepsAnalysis: this.AnalyzePose + "/front_double_biceps",
    sideChestAnalysis: this.AnalyzePose + "/side_chest",
  };
}
