import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {Subject} from 'rxjs';
import {BettorService} from '../../services/bettor.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'bettor-right-sidenav',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'],
  animations : fuseAnimations
})
export class RightComponent implements OnInit,OnDestroy {
  view :string;
  width :string;
  private unsubscribeAll: Subject<any>;

  constructor(private bettorService: BettorService) {

    this.view = 'contest-info';
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.bettorService.onRightSidenavViewChanged
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
