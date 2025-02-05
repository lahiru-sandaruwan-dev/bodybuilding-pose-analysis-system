import { Injectable, Type } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
  DynamicDialogTemplates,
} from "primeng/dynamicdialog";
import { of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PopupService {
  openDynamicDialogRefs: DynamicDialogRef[] = [];
  private openedModals: Array<string>;

  constructor(private dialogService: DialogService) {
    this.openedModals = [];
  }

  OpenModel(
    compnent: Type<any>,
    config: DynamicDialogConfig,
    templates: DynamicDialogTemplates = {}
  ) {
    let ref;
    this.openDynamicDialogRefs.push(
      (ref = this.dialogService.open(compnent, {
        header: config.header,
        data: config.data,
        width: config.width || "50vw",
        breakpoints: {
          "960px": "75vw",
          "640px": "90vw",
        },
        templates: {
          footer: templates.footer,
        },
      }))
    );

    return ref.onClose.pipe(
      map((data) => {
        return data;
      })
    );
  }

  closeOpenDialogs() {
    this.openDynamicDialogRefs.forEach(
      (openDynamicDialogRef: DynamicDialogRef) => openDynamicDialogRef.destroy()
    );
    this.openDynamicDialogRefs = [];
  }

  OpenModelPrint(compnent: Type<any>, config: DynamicDialogConfig) {
    if (!this.checkExist(compnent.name)) {
      this.openedModals.push(compnent.name);
    } else {
      return of(false);
    }
    const ref = this.dialogService.open(compnent, {
      header: config.header,
      data: config.data,
      width: config.width || "75vw",
      // height : config.height || "400vw",
    });

    return ref.onClose.pipe(
      map((data) => {
        this.removeItem(compnent.name);
        return data;
      })
    );
  }

  private checkExist(modalName: string) {
    let exist = this.openedModals.find((item) => item == modalName);
    if (exist != null && exist != undefined) {
      return true;
    } else {
      return false;
    }
  }

  private removeItem(item: string) {
    let index = this.openedModals.indexOf(item);
    if (index > -1) {
      this.openedModals.splice(index, 1);
    }
  }
}
