import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpensesReportComponent } from './monthly-expenses-report.component';

describe('MonthlyExpensesReportComponent', () => {
  let component: MonthlyExpensesReportComponent;
  let fixture: ComponentFixture<MonthlyExpensesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyExpensesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyExpensesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
