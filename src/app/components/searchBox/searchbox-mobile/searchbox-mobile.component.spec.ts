import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchboxMobileComponent } from './searchbox-mobile.component';

describe('SearchboxMobileComponent', () => {
  let component: SearchboxMobileComponent;
  let fixture: ComponentFixture<SearchboxMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchboxMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchboxMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
