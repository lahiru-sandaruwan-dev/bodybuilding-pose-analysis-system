import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  constructor() {}

  getCurrentLocation(): Observable<{ latitude: number; longitude: number }> {
    return new Observable((observer) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error(
          new Error("Geolocation is not supported by this browser.")
        );
      }
    });
  }
}
