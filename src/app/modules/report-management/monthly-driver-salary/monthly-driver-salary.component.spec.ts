import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDriverSalaryComponent } from './monthly-driver-salary.component';

describe('MonthlyDriverSalaryComponent', () => {
  let component: MonthlyDriverSalaryComponent;
  let fixture: ComponentFixture<MonthlyDriverSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDriverSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyDriverSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
