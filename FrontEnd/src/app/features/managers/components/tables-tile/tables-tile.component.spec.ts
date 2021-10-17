import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesTileComponent } from './tables-tile.component';

describe('TablesTileComponent', () => {
  let component: TablesTileComponent;
  let fixture: ComponentFixture<TablesTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
