import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {BettorService} from '../../services/bettor.service';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
  selector: 'bettor-left-sidenav',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss'],
  animations: fuseAnimations
})
export class LeftComponent implements OnInit,OnDestroy {

  view: string;

  private unsubscribeAll: Subject<any>;

  constructor(private bettorService: BettorService) {
    this.view = 'user-contest';
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.bettorService.onLeftSidenavViewChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(view => {
        this.view = view;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
