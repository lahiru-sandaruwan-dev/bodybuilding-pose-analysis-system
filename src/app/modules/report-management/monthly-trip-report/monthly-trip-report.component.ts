import { DatePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-monthly-trip-report',
  templateUrl: './monthly-trip-report.component.html',
  styleUrls: ['./monthly-trip-report.component.scss']
})
export class MonthlyTripReportComponent {
  @ViewChild("templateRef", { static: true }) templateRef: TemplateRef<any>;
  month = new Date();
  reportDetails: any[] = [];

  constructor(
    private sidebarService: SidebarService,
    private messageService: AppMessageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.sidebarService.setFooterTemplate(this.templateRef);
    let sideBarData = this.sidebarService.getData();
    this.month = new Date(sideBarData.month);
    this.reportDetails = sideBarData?.reportDetails;
    if (this.reportDetails.length > 0) {
      this.preprocessData();
    }
  }

  preprocessData() {
    this.reportDetails.map((report: any) => {

      if (report?.hotels?.length > 0) {
        report.hotels.map((hotel: any) => {
          let dates = hotel.dates.split(",");
          hotel.showDates = dates
            .map((x: any) => {
              return this.datePipe.transform(new Date(x), "MMM d");
            })
            .join(", ");
        })
      }

      if (report?.activities.length > 0) {
        let activityCost = report?.activities.reduce(
          (acc, curr) => acc + curr.totalCost,
          0
        );

        report.activityCost = activityCost;
      } else {
        report.activityCost = 0;
      }

      if (report?.places.length > 0) {
        report?.places.map((x: any) => {
          x.showDates = x.dates
            .map((x) => {
              return this.datePipe.transform(new Date(x), "MMM d");
            })
            .join(", ");
        });
      }
    })
  }
}
