import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTripReportComponent } from './monthly-trip-report.component';

describe('MonthlyTripReportComponent', () => {
  let component: MonthlyTripReportComponent;
  let fixture: ComponentFixture<MonthlyTripReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyTripReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyTripReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
