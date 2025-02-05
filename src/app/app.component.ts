import { Component, HostListener, TemplateRef } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { SidebarService } from "./shared/services/sidebar.service";
import { DataAccessService } from "./shared/services/data-access.service";
import { AppMessageService } from "./shared/services/app-message.service";
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { Keepalive } from "@ng-idle/keepalive";
import { MasterDataService } from "./shared/services/master-data.service";
import { PopupService } from "./shared/services/popup.service";
import { InactiveLoginComponent } from "./shared/components/inactive-login/inactive-login.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  componentList: any[] = [];
  footer: TemplateRef<any>;
  layoutMode = "static";
  sidebarVisible = false;
  sidebarProperties: any;
  sidebarHeader: any;
  theme = "green";
  idleState = "Not started.";
  timedOut = false;
  lastPing?: Date = null;
  isSidebarFullSize: boolean = false;

  inputStyle = "outlined";

  ripple: boolean;
  constructor(
    private primengConfig: PrimeNGConfig,
    private sidebarService: SidebarService,
    private dataAccess: DataAccessService,
    private msgService: AppMessageService,
    private idle: Idle,
    private keepalive: Keepalive,
    private masterDataService: MasterDataService,
    private popupService: PopupService,
    private router: Router
  ) {
    // this.configureIdle();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.ripple = true;

    this.dataAccess.Request.subscribe((count) => {
      if (count > 0) {
        this.msgService.ShowLoading();
      }

      if (count == 0) {
        this.msgService.DismissLoading();
      }
    });

    this.checkScreenWidth();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    const width = window.innerWidth;
    if (width < 1024) {
      this.isSidebarFullSize = true;
    } else {
      this.isSidebarFullSize = false;
    }
  }

  ngAfterContentChecked() {
    this.callSidebar();
  }

  callSidebar() {
    this.componentList = this.sidebarService.getComponentList();
    this.sidebarProperties = this.sidebarService.getProperties();
    this.sidebarHeader = this.sidebarService.getHeader();
    this.footer = this.sidebarService.getFooterTemplate();

    if (this.componentList.length > 0) {
      this.sidebarVisible = true;
    }
  }

  sideDrawer() {
    this.sidebarService.removeComponent();
    this.sidebarVisible = false;
  }
  configureIdle() {
    this.idle.setIdle(15 * 60); // 15 minutes of inactivity
    this.idle.setTimeout(1); // after 1 second of inactivity, prompt the login
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = "No longer idle.";
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = "Timed out!";
      this.timedOut = true;
      this.masterDataService.TimedOut = "true";

      let token = this.masterDataService.SessionKey;
      if (token) {
        this.promptLogin();
      } else {
        this.reset();
      }
    });

    this.idle.onIdleStart.subscribe(
      () => (this.idleState = "You've gone idle!")
    );

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = "You will time out in " + countdown + " seconds!";
    });

    let timeOut = this.masterDataService.TimedOut;
    let token = this.masterDataService.SessionKey;

    if (token && timeOut == "true") {
      this.promptLogin();
    } else {
      this.reset();
    }
  }

  promptLogin() {
    this.popupService
      .OpenModel(InactiveLoginComponent, {
        header: "SESSION EXPIRED",
        width: "28vw",
      })
      .subscribe((res) => {
        if (res) {
          this.reset(); // reset idle if login successful
          let currentUrl = this.router.url;
          this.router.navigate([currentUrl], { skipLocationChange: true });
        } else {
          this.masterDataService.clearLoginData();
          this.router.navigate(["/"]);
        }
      });
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
    this.masterDataService.TimedOut = "false";
  }
}
