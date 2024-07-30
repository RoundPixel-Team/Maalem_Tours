import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineServiceComponent } from './offline-service.component';

describe('OfflineServiceComponent', () => {
  let component: OfflineServiceComponent;
  let fixture: ComponentFixture<OfflineServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflineServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
