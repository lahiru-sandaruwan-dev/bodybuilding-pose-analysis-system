import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}

  // save: '/',
  // getAll: '/',
  // getById: '/:id',
  // update: '/:id',
  // deleteById: '/:id',
  // activeInactiveVehicles: '/activeInactive/:id',

  SaveVehicle(body: any) {
    return this.dataAccess
      .POST(this.resource.vehicle.saveVehicle, body)
      .pipe((response) => {
        return response;
      });
  }

  GetAllVehicles(withInactive: boolean = false) {
    return this.dataAccess
      .GET(
        this.resource.vehicle.getAllVehicles + `?withInactive=${withInactive}`
      )
      .pipe((response) => {
        return response;
      });
  }

  GetVehicleById(vehicleId: string) {
    return this.dataAccess
      .GET(this.resource.vehicle.getVehicleById + `/${vehicleId}`)
      .pipe((response) => {
        return response;
      });
  }

  UpdateVehicle(vehicleId: string, body: any) {
    return this.dataAccess
      .PUT(this.resource.vehicle.updateVehicle + `/${vehicleId}`, body)
      .pipe((response) => {
        return response;
      });
  }

  DeleteVehicleById(vehicleId: string) {
    return this.dataAccess
      .DELETE(this.resource.vehicle.deleteVehicleById + `/${vehicleId}`)
      .pipe((response) => {
        return response;
      });
  }

  ActiveInactiveVehicles(vehicleId: string, status: number) {
    return this.dataAccess
      .PUT(
        this.resource.vehicle.activeInactiveVehicles +
          `/${vehicleId}?status=${status}`,
        null
      )
      .pipe((response) => {
        return response;
      });
  }

  GetByPassengerCount(passengerCount: number) {
    return this.dataAccess
      .GET(this.resource.vehicle.getAllVehiclesByCount + `/${passengerCount}`)
      .pipe((response) => {
        return response;
      });
  }
}
