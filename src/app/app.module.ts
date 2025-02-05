import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  DatePipe,
  DecimalPipe,
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "@fullcalendar/angular";
import { GalleriaModule } from "primeng/galleria";
import { ImageModule } from "primeng/image";
import { InplaceModule } from "primeng/inplace";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { SliderModule } from "primeng/slider";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { MenubarModule } from "primeng/menubar";

import { VirtualScrollerModule } from "primeng/virtualscroller";
import { AppComponent } from "./app.component";
import { DataAccessService } from "./shared/services/data-access.service";
import { HelperService } from "./shared/services/helper.service";
import { PopupService } from "./shared/services/popup.service";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { AppMessageService } from "./shared/services/app-message.service";
import { TransactionHandlerService } from "./shared/services/transaction-handler.service";
import { RouteGuardService } from "./shared/services/route-guard.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StyleClassModule } from "primeng/styleclass";
import { SidebarService } from "./shared/services/sidebar.service";
import { WebcamViewComponent } from "./shared/components/webcam-view/webcam-view.component";
import { WebcamModule } from "ngx-webcam";
import { AuthorizationInterceptor } from "./core/interceptor/authorization.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from "./shared.module";
import { UserModule } from "./modules/user/user.module";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { InactiveLoginComponent } from "./shared/components/inactive-login/inactive-login.component";
import { DefaultLayoutNewComponent } from "./layout/default-layout-new/default-layout-new.component";
import { DefaultDashboardComponent } from "./layout/default-dashboard/default-dashboard.component";
import { NgxPrintModule } from "ngx-print";
import { NotificationsComponent } from "./layout/notifications/notifications.component";
// import { TripManagementComponent } from "./modules/trip-management/trip-management.component";
// import { TripManagementFormComponent } from "./modules/trip-management/trip-management-form/trip-management-form.component";
// import { AddDriverAndVehicleFormComponent } from "./modules/trip-management/add-driver-and-vehicle-form/add-driver-and-vehicle-form.component";
// import { DriverManagementComponent } from "./modules/driver-management/driver-management.component";
// import { DriverTaskFormComponent } from "./modules/driver-management/driver-task-form/driver-task-form.component";
// import { TripManagementByDriverComponent } from "./modules/trip-management/trip-management-by-driver/trip-management-by-driver.component";
// import { GeneralInformationComponent } from "./modules/trip-management/trip-management-form/general-information/general-information.component";
// import { GuestInformationComponent } from "./modules/trip-management/trip-management-form/guest-information/guest-information.component";
// import { OtherInformationComponent } from "./modules/trip-management/trip-management-form/other-information/other-information.component";
// import { TripInformationsComponent } from "./modules/trip-management/trip-management-form/trip-informations/trip-informations.component";

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BreadcrumbModule,
    SharedModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    MenubarModule,
    ChipModule,
    ChipsModule,
    // CodeHighlighterModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    // LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TimelineModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    CommonModule,
    FontAwesomeModule,
    StyleClassModule,
    WebcamModule,
    NgxSpinnerModule,
    SharedModule,
    IconFieldModule,
    InputIconModule,
    NgIdleKeepaliveModule.forRoot(),
    UserModule,
    NgxPrintModule,
  ],
  declarations: [
    AppComponent,
    WebcamViewComponent,
    InactiveLoginComponent,
    DefaultLayoutNewComponent,
    DefaultDashboardComponent,
    NotificationsComponent
    // TripManagementComponent,
    // TripManagementFormComponent,
    // AddDriverAndVehicleFormComponent,
    // DriverManagementComponent,
    // DriverTaskFormComponent,
    // TripManagementByDriverComponent,
    // GeneralInformationComponent,
    // GuestInformationComponent,
    // OtherInformationComponent,
    // TripInformationsComponent,
  ],
  providers: [
    DataAccessService,
    ConfirmationService,
    HelperService,
    PopupService,
    DialogService,
    DynamicDialogConfig,
    DatePipe,
    DecimalPipe,
    MessageService,
    TransactionHandlerService,
    AppMessageService,
    // DateConverterPipe,
    SidebarService,
    RouteGuardService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
