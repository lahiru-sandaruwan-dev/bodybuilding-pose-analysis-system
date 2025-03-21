import { Component, ElementRef, ViewChild } from "@angular/core";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { PoseAnalysisService } from "src/app/shared/services/api-services/pose-analysis.service";
import { SocketService } from "src/app/shared/services/socket-services/socket.service";
import { CommonForm } from "src/app/shared/services/app-common-form";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { MasterDataService } from "src/app/shared/services/master-data.service";
import { FormBuilder, Validators } from "@angular/forms";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { PoseDetailsComponent } from "./pose-details/pose-details.component";
import { PopupService } from "src/app/shared/services/popup.service";
import { ShowRecommendationsComponent } from "./show-recommendations/show-recommendations.component";

@Component({
  selector: "app-front-double-bicepe-form",
  templateUrl: "./front-double-bicepe-form.component.html",
  styleUrls: ["./front-double-bicepe-form.component.scss"],
})
export class FrontDoubleBicepeFormComponent {
  FV = new CommonForm();
  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;
  detector!: poseDetection.PoseDetector;
  angles: any;
  pose_status: any = "";
  isCameraOn = false; // Track camera state
  videoStream: MediaStream | null = null; // Store video stream
  poseDetectionInterval: any;
  posesArr: any[] = [
    { id: 1, name: "Front Double Biceps" },
    { id: 2, name: "Side Chest" },
    { id: 3, name: "Side Triceps" },
    { id: 4, name: "Abdominal and Thigh" },
    { id: 5, name: "Most Muscular" },
  ];
  selectedPose: any;
  data1: any;
  data2: any;
  data3: any;
  options: any;

  bicepsInjuryRiskProbability: any = 0;
  tricepsInjuryRiskProbability: any = 0;
  shouldersInjuryRiskProbability: any = 0;

  bicepeStatus: any = "";
  tricepsStatus: any = "";
  shouldersStatus: any = "";

  injury_risk_percentage: any = 0;

  feedbacks: any[] = [];

  selectedPoseData: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private msgService: AppMessageService,
    private msg: MessageService,
    private masterDataService: MasterDataService,
    private socketService: SocketService,
    private poseAnalysisService: PoseAnalysisService,
    private sidebarService: SidebarService,
    private popUpService: PopupService
  ) {
    this.createForm();
  }

  createForm() {
    this.FV.formGroup = this.formBuilder.group({
      poses: ["", Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.chartData();
    await this.initializeTensorFlow();
    await this.loadModel();
  }

  chartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    this.data1 = {
      datasets: [
        {
          data: [this.bicepsInjuryRiskProbability, 100 - 0],
          backgroundColor: ["#89cc97", "#E0E0E0"],
        },
      ],
    };

    this.data2 = {
      datasets: [
        {
          data: [this.tricepsInjuryRiskProbability, 100 - 0],
          backgroundColor: ["#89cc97", "#E0E0E0"],
        },
      ],
    };

    this.data3 = {
      datasets: [
        {
          data: [this.shouldersInjuryRiskProbability, 100 - 0],
          backgroundColor: ["#89cc97", "#E0E0E0"],
        },
      ],
    };

    // this.options = {
    //   cutout: "60%",
    //   plugins: {
    //     legend: {
    //       labels: {
    //         color: textColor,
    //       },
    //     },
    //   },
    // };

    this.options = {
      responsive: true,
      legend: {
        position: "right",
      },
      elements: {
        arc: {
          borderWidth: 0.5, // Adjust the border width as needed
          borderRadius: [100, 20],
        },
      },
      cutout: "70%", // Adjust the size of the inner circle (doughnut hole)
    };
  }

  async initializeTensorFlow() {
    await tf.setBackend("cpu");
    await tf.ready();
    console.log("TensorFlow.js is ready!");
  }

  async loadModel() {
    this.detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet
    );
    console.log("Pose model loaded!");
  }

  toggleCamera(): void {
    if (this.FV.validateControllers("poses")) {
      this.msgService.showWarnAlert("Please select a pose!");
      return;
    }

    if (this.isCameraOn) {
      this.stopVideoStream(); // Stop the camera if it's on
    } else {
      this.startVideoStream(); // Start the camera if it's off
    }
    this.isCameraOn = !this.isCameraOn; // Toggle state
  }

  startVideoStream(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.videoStream = stream; // Store the stream reference
        const videoElement = this.video.nativeElement;
        videoElement.srcObject = stream;

        videoElement.addEventListener("loadedmetadata", () => {
          console.log("Video metadata loaded, waiting for first frame...");
          videoElement.play();
        });

        videoElement.addEventListener("playing", () => {
          console.log("Video is playing, starting pose detection...");
          this.detectPose(); // Start pose detection only when video starts playing
        });
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }

  stopVideoStream(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
      this.videoStream = null; // Clear stored stream
    }

    const videoElement = this.video.nativeElement;
    if (videoElement) {
      videoElement.pause(); // 🔹 Pause the video to stop it from running
      videoElement.srcObject = null; // 🔹 Clear video source
    }

    console.log("Camera stopped successfully.");
  }

  async detectPose() {
    if (this.poseDetectionInterval) {
      clearInterval(this.poseDetectionInterval); // Stop any previous interval to prevent duplicates
    }

    this.poseDetectionInterval = setInterval(async () => {
      if (!this.isCameraOn || !this.detector) return;

      const videoElement = this.video.nativeElement;

      if (
        !videoElement ||
        videoElement.videoWidth === 0 ||
        videoElement.videoHeight === 0
      ) {
        console.warn("Skipping pose detection - Video is not available.");
        return;
      }

      try {
        const poses = await this.detector.estimatePoses(videoElement);

        if (poses.length > 0) {
          const keypoints = poses[0].keypoints;
          console.log("Keypoints:", keypoints);

          // Calculate angles
          this.angles = this.calculateAngles(keypoints);
          console.log("Calculated Angles:", this.angles);

          // Send pose data via WebSocket
          this.analyzePose(this.angles);
        }
      } catch (error) {
        console.error("Error during pose estimation:", error);
      }
    }, 100); // Run every 100ms
  }

  calculateAngles(keypoints: any): any {
    const shoulder_r = [keypoints[6].x, keypoints[6].y];
    const elbow_r = [keypoints[8].x, keypoints[8].y];
    const wrist_r = [keypoints[10].x, keypoints[10].y];

    const shoulder_l = [keypoints[5].x, keypoints[5].y];
    const elbow_l = [keypoints[7].x, keypoints[7].y];
    const wrist_l = [keypoints[9].x, keypoints[9].y];

    const hip_r = [keypoints[12].x, keypoints[12].y];
    const hip_l = [keypoints[11].x, keypoints[11].y];
    const neck = [keypoints[1].x, keypoints[1].y];

    const right_arm_angle = this.calculateAngle(shoulder_r, elbow_r, wrist_r);
    const left_arm_angle = this.calculateAngle(shoulder_l, elbow_l, wrist_l);

    const right_lat_angle = this.calculateAngle(neck, shoulder_r, hip_r);
    const left_lat_angle = this.calculateAngle(neck, shoulder_l, hip_l);

    if (
      right_arm_angle === null ||
      left_arm_angle === null ||
      right_lat_angle === null ||
      left_lat_angle === null
    ) {
      return null;
    }

    return [right_arm_angle, left_arm_angle, right_lat_angle, left_lat_angle];
  }

  calculateAngle(a: number[], b: number[], c: number[]): number | null {
    if (!a || !b || !c) {
      return null;
    }

    const ab = [a[0] - b[0], a[1] - b[1]];
    const bc = [c[0] - b[0], c[1] - b[1]];

    const cross = ab[0] * bc[1] - ab[1] * bc[0];
    const dot = ab[0] * bc[0] + ab[1] * bc[1];

    const angle = Math.atan2(cross, dot) * (180 / Math.PI);
    return angle;
  }

  analyzePose(angles: any) {
    try {
      switch (this.selectedPose) {
        case "Front Double Biceps":
          this.analyseFrontDoubleBicepePose(angles);
          break;
        case "Side Chest":
          this.analyseSideChestPose(angles);
          break;
        case "Side Triceps":
          break;
        default:
          break;
      }
    } catch (error: any) {
      this.msgService.showErrorAlert(error.message);
    }
  }

  analyseFrontDoubleBicepePose(angles: any) {
    let obj = {
      // "angles": [150, 160, 85, 85] //correct pose angels
      angles: angles, //correct pose angels
    };

    this.poseAnalysisService
      .frontDoubleBicepsAnalysis(obj)
      .subscribe((response: any) => {
        if (response.IsSuccessful) {
          // this.msgService.showSuccessAlert(response.Message);
          this.pose_status = "";
          this.feedbacks = [];
          this.injury_risk_percentage = 0;

          this.bicepsInjuryRiskProbability = 0;
          this.tricepsInjuryRiskProbability = 0;
          this.shouldersInjuryRiskProbability = 0;

          this.bicepeStatus = "";
          this.tricepsStatus = "";
          this.shouldersStatus = "";

          let Result = response.Result;
          this.pose_status = Result.pose_status;
          console.log("Front Double Biceps Analysis Data", Result);

          this.injury_risk_percentage = Result.injury_risk_percentage;
          this.feedbacks = Result.feedback;

          this.bicepsInjuryRiskProbability =
            Result?.biceps_injury_risk?.probability;
          this.tricepsInjuryRiskProbability =
            Result?.triceps_injury_risk?.probability;
          this.shouldersInjuryRiskProbability =
            Result?.shoulders_injury_risk?.probability;

          this.bicepeStatus = Result?.biceps_injury_risk?.status;
          this.tricepsStatus = Result?.triceps_injury_risk?.status;
          this.shouldersStatus = Result?.shoulders_injury_risk?.status;

          let chartColor = this.bicepeStatus.toLowerCase().includes("low")
            ? "#15d63e"
            : "#e74c3c"; // green if "low", else red

          if (this.bicepsInjuryRiskProbability == 0) {
            this.data1 = {
              datasets: [
                {
                  data: [this.bicepsInjuryRiskProbability, 100 - 0],
                  backgroundColor: ["#89cc97", "#E0E0E0"],
                },
              ],
            };
          } else {
            this.data1 = {
              datasets: [
                {
                  data: [
                    this.bicepsInjuryRiskProbability,
                    100 - this.bicepsInjuryRiskProbability,
                  ],
                  backgroundColor: [chartColor, "#E0E0E0"],
                },
              ],
            };
          }

          let chartColor1 = this.tricepsStatus.toLowerCase().includes("low")
            ? "#15d63e"
            : "#e74c3c"; // green if "low", else red

          this.data2 = {
            datasets: [
              {
                data: [
                  this.tricepsInjuryRiskProbability,
                  100 - this.tricepsInjuryRiskProbability,
                ],
                backgroundColor: [chartColor1, "#E0E0E0"],
              },
            ],
          };

          let chartColor2 = this.shouldersStatus.toLowerCase().includes("low")
            ? "#15d63e"
            : "#e74c3c"; // green if "low", else red

          this.data3 = {
            datasets: [
              {
                data: [
                  this.shouldersInjuryRiskProbability,
                  100 - this.shouldersInjuryRiskProbability,
                ],
                backgroundColor: [chartColor2, "#E0E0E0"],
              },
            ],
          };
        } else {
          this.msgService.showErrorAlert(response.Message);
        }
      });
  }

  analyseSideChestPose(angles: any) {
    try {
      let obj = {
        // "angles": [150, 160, 85, 85] //correct pose angels
        angles: angles, //correct pose angels
      };

      this.poseAnalysisService
        .sideChestAnalysis(obj)
        .subscribe((response: any) => {
          if (response.IsSuccessful) {
            // this.msgService.showSuccessAlert(response.Message);
            this.pose_status = "";
            this.feedbacks = [];
            this.injury_risk_percentage = 0;

            this.bicepsInjuryRiskProbability = 0;
            this.tricepsInjuryRiskProbability = 0;
            this.shouldersInjuryRiskProbability = 0;

            this.bicepeStatus = "";
            this.tricepsStatus = "";
            this.shouldersStatus = "";

            let Result = response.Result;
            this.pose_status = Result.pose_status;
            console.log("Front Double Biceps Analysis Data", Result);

            this.injury_risk_percentage = Result.injury_risk_percentage;
            this.feedbacks = Result.feedback;

            this.bicepsInjuryRiskProbability =
              Result?.biceps_injury_risk?.probability;
            this.tricepsInjuryRiskProbability =
              Result?.triceps_injury_risk?.probability;
            this.shouldersInjuryRiskProbability =
              Result?.shoulders_injury_risk?.probability;

            this.bicepeStatus = Result?.biceps_injury_risk?.status;
            this.tricepsStatus = Result?.triceps_injury_risk?.status;
            this.shouldersStatus = Result?.shoulders_injury_risk?.status;

            let chartColor = this.bicepeStatus.toLowerCase().includes("low")
              ? "#15d63e"
              : "#e74c3c"; // green if "low", else red

            if (this.bicepsInjuryRiskProbability == 0) {
              this.data1 = {
                datasets: [
                  {
                    data: [this.bicepsInjuryRiskProbability, 100 - 0],
                    backgroundColor: ["#89cc97", "#E0E0E0"],
                  },
                ],
              };
            } else {
              this.data1 = {
                datasets: [
                  {
                    data: [
                      this.bicepsInjuryRiskProbability,
                      100 - this.bicepsInjuryRiskProbability,
                    ],
                    backgroundColor: [chartColor, "#E0E0E0"],
                  },
                ],
              };
            }

            let chartColor1 = this.tricepsStatus.toLowerCase().includes("low")
              ? "#15d63e"
              : "#e74c3c"; // green if "low", else red

            this.data2 = {
              datasets: [
                {
                  data: [
                    this.tricepsInjuryRiskProbability,
                    100 - this.tricepsInjuryRiskProbability,
                  ],
                  backgroundColor: [chartColor1, "#E0E0E0"],
                },
              ],
            };

            let chartColor2 = this.shouldersStatus.toLowerCase().includes("low")
              ? "#15d63e"
              : "#e74c3c"; // green if "low", else red

            this.data3 = {
              datasets: [
                {
                  data: [
                    this.shouldersInjuryRiskProbability,
                    100 - this.shouldersInjuryRiskProbability,
                  ],
                  backgroundColor: [chartColor2, "#E0E0E0"],
                },
              ],
            };
          } else {
            this.msgService.showErrorAlert(response.Message);
          }
        });
    } catch (error: any) {
      this.msgService.showErrorAlert(error);
    }
  }

  ngOnDestroy(): void {
    this.socketService.closeConnection();
  }

  onChangePose() {
    this.clearValues();
    let pose = this.FV.getValue("poses");
    this.selectedPose = pose.name;
    console.log("Selected Pose", this.selectedPose);
  }

  clearValues() {
    this.pose_status = "";
    this.feedbacks = [];
    this.injury_risk_percentage = 0;

    this.bicepsInjuryRiskProbability = 0;
    this.tricepsInjuryRiskProbability = 0;
    this.shouldersInjuryRiskProbability = 0;

    this.bicepeStatus = "";
    this.tricepsStatus = "";
    this.shouldersStatus = "";

    this.data1 = {
      datasets: [
        {
          data: [this.bicepsInjuryRiskProbability, 100 - 0],
          backgroundColor: ["#89cc97", "#E0E0E0"],
        },
      ],
    };

    this.data2 = {
      datasets: [
        {
          data: [this.tricepsInjuryRiskProbability, 100 - 0],
          backgroundColor: ["#89cc97", "#E0E0E0"],
        },
      ],
    };

    this.data3 = {
      datasets: [
        {
          data: [this.shouldersInjuryRiskProbability, 100 - 0],
          backgroundColor: ["#89cc97", "#E0E0E0"],
        },
      ],
    };
  }

  showPoseDetails() {
    try {
      console.log("Booking Details");
      let data = {
        userData: null,
        isEdit: false,
      };

      let properties = {
        width: "50vw",
        position: "right",
      };

      this.sidebarService.addComponent(
        "Pose Details",
        PoseDetailsComponent,
        properties,
        data
      );
    } catch (error: any) {
      console.log(error);
      this.msgService.showErrorAlert(error);
    }
  }

  onClickRecommendation() {
    this.popUpService
      .OpenModel(ShowRecommendationsComponent, {
        header: "Recommendations",
        width: "70vw",
      })
      .subscribe((res) => {});
  }
}
