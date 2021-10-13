import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-main',
  templateUrl: './staff-main.component.html',
  styleUrls: ['./staff-main.component.scss'],    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
