import { Injectable } from "@angular/core";
import { io, ManagerOptions, Socket } from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class WegaShineSocketService {
  private socket: Socket;

  constructor() {}

  // Initialize WebSocket connection with credentials
  connect(): void {
    this.socket = io("http://portal.wegashine.lk", {
      path: "/api/socket",
      transports: ["websocket"],
      withCredentials: true,
    });

    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    this.socket.on("connect_error", (error: any) => {
      console.error("WebSocket connection error:", error);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
  }

  listen(eventName: string): void {
    this.socket.on(eventName, (data: any) => {
      console.log(`Received data for event ${eventName}:`, data);
    });
  }

  // Method to emit events to the WebSocket server
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Disconnect the WebSocket connection
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
