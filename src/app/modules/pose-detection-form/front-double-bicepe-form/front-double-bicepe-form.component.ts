import { Component, ElementRef, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { PoseAnalysisService } from 'src/app/shared/services/api-services/pose-analysis.service';

@Component({
  selector: 'app-front-double-bicepe-form',
  templateUrl: './front-double-bicepe-form.component.html',
  styleUrls: ['./front-double-bicepe-form.component.scss']
})
export class FrontDoubleBicepeFormComponent {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  detector!: poseDetection.PoseDetector;
  angles: any

  constructor(
    private msgService: AppMessageService,
    private poseAnalysisService: PoseAnalysisService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.initializeTensorFlow(); // Initialize TensorFlow backend
    await this.loadModel();
    this.startVideoStream();
  }

  async initializeTensorFlow() {
    await tf.setBackend('cpu'); // Use 'wasm' or 'cpu' instead of 'webgpu'
    await tf.ready();
    console.log('TensorFlow.js is ready!');
  }

  async loadModel() {
    this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
    console.log('Pose model loaded!');
  }

  startVideoStream(): void {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.video.nativeElement.srcObject = stream;
      this.detectPose();
    });
  }

  async detectPose() {
    setInterval(async () => {
      if (!this.detector) return;

      const poses = await this.detector.estimatePoses(this.video.nativeElement);
      if (poses.length > 0) {
        const keypoints = poses[0].keypoints;

        console.log('Keypoints:', keypoints);

        // Calculate angles using keypoints
        const angles = this.calculateAngles(keypoints);
        this.angles = this.calculateAngles(keypoints);
        console.log('Calculated Angles:', angles);
      }
    }, 100); // Run every 100ms
  }

  calculateAngles(keypoints: any): any {
    // Extract coordinates for required joints
    const shoulder_r = [keypoints[6].x, keypoints[6].y]; // Right Shoulder
    const elbow_r = [keypoints[8].x, keypoints[8].y]; // Right Elbow
    const wrist_r = [keypoints[10].x, keypoints[10].y]; // Right Wrist

    const shoulder_l = [keypoints[5].x, keypoints[5].y]; // Left Shoulder
    const elbow_l = [keypoints[7].x, keypoints[7].y]; // Left Elbow
    const wrist_l = [keypoints[9].x, keypoints[9].y]; // Left Wrist

    const hip_r = [keypoints[12].x, keypoints[12].y]; // Right Hip
    const hip_l = [keypoints[11].x, keypoints[11].y]; // Left Hip
    const neck = [keypoints[1].x, keypoints[1].y]; // Neck

    // Calculate angles for arms
    const right_arm_angle = this.calculateAngle(shoulder_r, elbow_r, wrist_r);
    const left_arm_angle = this.calculateAngle(shoulder_l, elbow_l, wrist_l);

    // Calculate angles for shoulder-lat structures
    const right_lat_angle = this.calculateAngle(neck, shoulder_r, hip_r);
    const left_lat_angle = this.calculateAngle(neck, shoulder_l, hip_l);

    if (right_arm_angle === null || left_arm_angle === null || right_lat_angle === null || left_lat_angle === null) {
      return null; // If any angle cannot be calculated, return null
    }

    // Return the calculated angles
    return [right_arm_angle, left_arm_angle, right_lat_angle, left_lat_angle];
  }

  calculateAngle(a: number[], b: number[], c: number[]): number | null {
    // Ensure all points are valid
    if (!a || !b || !c) {
      return null; // Return null if any point is missing
    }

    // Calculate the angle between 3 points (a, b, c)
    const ab = [a[0] - b[0], a[1] - b[1]];
    const bc = [c[0] - b[0], c[1] - b[1]];

    // Cross product and dot product to find the angle
    const cross = ab[0] * bc[1] - ab[1] * bc[0];
    const dot = ab[0] * bc[0] + ab[1] * bc[1];

    const angle = Math.atan2(cross, dot) * (180 / Math.PI);

    return angle; // Return the calculated angle in degrees
  }

  analyzePose(angles: any) {
    try {
      let obj = {
        "angles": [150, 160, 85, 85] //correct pose angels
      }

      debugger
      this.poseAnalysisService.frontDoubleBicepsAnalysis(obj).subscribe((response: any) => {
        debugger
        if (response.IsSuccessful) {
          this.msgService.showSuccessAlert(response.Message);
          let Result = response.Result;
          console.log('Front Double Biceps Analysis Data', Result);
        } else {
          this.msgService.showErrorAlert(response.Message);
        }
      })

    } catch (error: any) {
      this.msgService.showErrorAlert(error.message);
    }
  }

}
