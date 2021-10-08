import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsMainComponent } from './locations.component';

describe('LocationsMainComponent', () => {
  let component: LocationsMainComponent;
  let fixture: ComponentFixture<LocationsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
