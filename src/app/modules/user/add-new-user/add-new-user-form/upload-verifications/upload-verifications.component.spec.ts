import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVerificationsComponent } from './upload-verifications.component';

describe('UploadVerificationsComponent', () => {
  let component: UploadVerificationsComponent;
  let fixture: ComponentFixture<UploadVerificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadVerificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadVerificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
