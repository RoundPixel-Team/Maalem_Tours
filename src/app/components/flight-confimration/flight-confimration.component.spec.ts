import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightConfimrationComponent } from './flight-confimration.component';

describe('FlightConfimrationComponent', () => {
  let component: FlightConfimrationComponent;
  let fixture: ComponentFixture<FlightConfimrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightConfimrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightConfimrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
