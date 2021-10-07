import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersMainComponent } from './managers-main.component';

describe('ManagersMainComponent', () => {
  let component: ManagersMainComponent;
  let fixture: ComponentFixture<ManagersMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagersMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
