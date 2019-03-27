import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blason',
  templateUrl: './blason.component.html',
  styleUrls: ['./blason.component.scss']
})
export class BlasonComponent implements OnInit {

  @Input() width:string;
  @Input() logo:string;
  @Input() height:string;

  constructor() { }

  ngOnInit() {
    this.logo ? null : this.logo = 'http://www.pngmart.com/files/1/Shield-Clip-Art-Black-And-White-PNG.png';
  }



}
