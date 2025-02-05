import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutNewComponent } from './default-layout-new.component';

describe('DefaultLayoutNewComponent', () => {
  let component: DefaultLayoutNewComponent;
  let fixture: ComponentFixture<DefaultLayoutNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultLayoutNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultLayoutNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
