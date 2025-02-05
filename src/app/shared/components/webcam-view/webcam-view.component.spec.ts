import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamViewComponent } from './webcam-view.component';

describe('WebcamViewComponent', () => {
  let component: WebcamViewComponent;
  let fixture: ComponentFixture<WebcamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcamViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebcamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
