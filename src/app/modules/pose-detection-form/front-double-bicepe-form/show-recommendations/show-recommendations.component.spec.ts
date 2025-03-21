import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecommendationsComponent } from './show-recommendations.component';

describe('ShowRecommendationsComponent', () => {
  let component: ShowRecommendationsComponent;
  let fixture: ComponentFixture<ShowRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRecommendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
