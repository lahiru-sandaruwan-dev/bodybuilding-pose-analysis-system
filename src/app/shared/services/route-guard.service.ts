import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { MasterDataService } from "./master-data.service";

@Injectable({
  providedIn: "root",
})
export class RouteGuardService {
  constructor(private _router: Router, private masterData: MasterDataService) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    try {
      let userData = this.masterData.ClientId || 1;
      if (userData != null && userData != "") {
        return of(true);
      } else {
        this._router.navigateByUrl("/login");
        return of(false);
      }
    } catch (error) {
      this._router.navigateByUrl("/login");
      return of(false);
    }
  }
}
