import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreamTileComponent } from './live-stream-tile.component';

describe('LiveStreamTileComponent', () => {
  let component: LiveStreamTileComponent;
  let fixture: ComponentFixture<LiveStreamTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveStreamTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStreamTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
