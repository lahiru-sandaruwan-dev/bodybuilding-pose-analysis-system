import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDoubleBicepeFormComponent } from './front-double-bicepe-form.component';

describe('FrontDoubleBicepeFormComponent', () => {
  let component: FrontDoubleBicepeFormComponent;
  let fixture: ComponentFixture<FrontDoubleBicepeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontDoubleBicepeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontDoubleBicepeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
