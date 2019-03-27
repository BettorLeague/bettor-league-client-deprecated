import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDrawer} from '@angular/material';

@Injectable()
export class BettorService {

  onLeftSidenavViewChanged: Subject<any>;
  onRightSidenavViewChanged: Subject<any>;
  pronosticDrawer: MatDrawer;

  constructor(){
    this.onLeftSidenavViewChanged = new Subject();
    this.onRightSidenavViewChanged = new Subject();
  }
}
