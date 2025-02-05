import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserFormComponent } from './add-new-user-form.component';

describe('AddNewUserFormComponent', () => {
  let component: AddNewUserFormComponent;
  let fixture: ComponentFixture<AddNewUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
