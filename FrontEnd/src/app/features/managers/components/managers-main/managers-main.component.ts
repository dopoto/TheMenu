import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managers-main',
  templateUrl: './managers-main.component.html',
  styleUrls: ['./managers-main.component.scss']  ,  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagersMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
