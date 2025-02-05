import { Component } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-webcam-view",
  templateUrl: "./webcam-view.component.html",
  styleUrls: ["./webcam-view.component.scss"],
})
export class WebcamViewComponent {
  public multipleWebcamsAvailable = false;
  public errors: WebcamInitError[] = [];

  public webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  selectedImage: File = null;
  imageUrl: string | ArrayBuffer | null = null;
  constructor(private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    const blob = this.dataURLtoBlob(webcamImage.imageAsDataUrl);
    const imageFile = new File([blob], "image.png", { type: "image/png" });

    if (imageFile) {
      this.selectedImage = imageFile;
      // Do something with the selected file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  removeImage() {
    this.webcamImage = null;
    this.selectedImage = null;
    this.imageUrl = null;
  }
  saveImage() {
    let data = {
      isSave: true,
      image: this.webcamImage,
      file: this.selectedImage,
      imageUrl: this.imageUrl,
    };

    this.ref.close(data);
  }

  onFileSelected(event: any): void {
    const file: File = event.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private dataURLtoBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
