import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareBreakupComponent } from './fare-breakup.component';

describe('FareBreakupComponent', () => {
  let component: FareBreakupComponent;
  let fixture: ComponentFixture<FareBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FareBreakupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
