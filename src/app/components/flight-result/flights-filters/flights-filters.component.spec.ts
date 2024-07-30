import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsFiltersComponent } from './flights-filters.component';

describe('FlightsFiltersComponent', () => {
  let component: FlightsFiltersComponent;
  let fixture: ComponentFixture<FlightsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
