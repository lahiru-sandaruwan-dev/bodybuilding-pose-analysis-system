import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoseDetailsComponent } from './pose-details.component';

describe('PoseDetailsComponent', () => {
  let component: PoseDetailsComponent;
  let fixture: ComponentFixture<PoseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
