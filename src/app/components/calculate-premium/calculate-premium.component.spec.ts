import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatePremiumComponent } from './calculate-premium.component';

describe('CalculatePremiumComponent', () => {
  let component: CalculatePremiumComponent;
  let fixture: ComponentFixture<CalculatePremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatePremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatePremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
