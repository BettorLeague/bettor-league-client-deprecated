import { Component, OnInit } from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';

@Component({
  selector: 'app-bettor-start',
  templateUrl: './bettor-start.component.html',
  styleUrls: ['./bettor-start.component.scss'],
  animations : fuseAnimations
})
export class BettorStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
