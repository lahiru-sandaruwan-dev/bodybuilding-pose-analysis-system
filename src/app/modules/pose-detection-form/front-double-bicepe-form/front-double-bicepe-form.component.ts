import { Component } from '@angular/core';

@Component({
  selector: 'app-front-double-bicepe-form',
  templateUrl: './front-double-bicepe-form.component.html',
  styleUrls: ['./front-double-bicepe-form.component.scss']
})
export class FrontDoubleBicepeFormComponent {
  predictedClass: string = '';
  confidence: number = 0;
  feedback: string[] = [];

  ngOnInit(): void {
    this.startVideoStream();
  }

  // Start video stream and capture frames
  startVideoStream(): void {
    const video: HTMLVideoElement = document.querySelector('video')!;

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      video.srcObject = stream;

      // Start capturing frames at intervals (e.g., every 100ms)
      setInterval(() => {
        this.captureFrame(video);
      }, 100); // 100ms interval
    });
  }

  // Capture frame from the video and send it to the backend
  captureFrame(video: HTMLVideoElement): void {
    const canvas = document.createElement('canvas');
    canvas.width = 224; // Resize to model input size
    canvas.height = 224;
    const context = canvas.getContext('2d');

    // If context is null, stop further execution
    if (!context) return;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to base64 format
    const imageData = canvas.toDataURL('image/jpeg'); // Get image as data URL

    // Send image data to the Flask API for prediction
    // this.poseService.predictPose(imageData.split(',')[1]) // Send only base64 string
    //   .subscribe((response: any) => {
    //     this.predictedClass = response.class;
    //     this.confidence = response.confidence * 100; // Convert to percentage
    //     this.feedback = response.feedback;
    //   });
  }
}
