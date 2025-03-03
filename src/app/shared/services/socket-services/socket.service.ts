import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  private serverUrl: string = 'http://127.0.0.1:8080'; // URL of your Flask backend

  constructor() {
    this.socket = io(this.serverUrl, {
      reconnection: true, // Automatically reconnect if the connection is lost
      reconnectionAttempts: 5, // Try to reconnect up to 5 times
      reconnectionDelay: 1000, // Wait for 1 second before reconnecting
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  get isConnected(): boolean {
    return this.socket.connected;
  }

  // Emit pose data to the server
  sendPoseData(data: any) {
    if (this.socket.connected) {
      this.socket.emit('pose_data', data); // Send pose data to the server
      console.log('Sent pose data:', data);
    } else {
      console.error('Socket is not connected');
    }
  }

  // Listen for pose analysis result from the server
  onPoseAnalysisResult(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('pose_analysis_result', (response: any) => {
        console.log('Received response:', response); // Add this log to check data
        observer.next(response);
      });

      // Cleanup listener when the observer unsubscribes
      return () => {
        this.socket.off('pose_analysis_result');
      };
    });
  }

  // Listen for errors from the server
  onError(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('error', (error: any) => {
        observer.next(error); // Emit error to subscriber
      });
    });
  }

  // Close the socket connection
  closeConnection() {
    if (this.socket.connected) {
      this.socket.disconnect();
      console.log('Socket disconnected');
    } else {
      console.warn('Socket is already disconnected');
    }
  }
}
