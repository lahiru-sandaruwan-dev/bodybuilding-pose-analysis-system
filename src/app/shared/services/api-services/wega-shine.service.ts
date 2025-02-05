import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class WegaShineService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}
}
