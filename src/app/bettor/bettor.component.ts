import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContestService} from './services/contest.service';
import {ContestModel} from './model/contest.model';

@Component({
  selector: 'app-bettor',
  templateUrl: './bettor.component.html',
  styleUrls: ['./bettor.component.scss']
})
export class BettorComponent implements OnInit,OnDestroy {

  selectedContest: ContestModel;

  private unsubscribeAll: Subject<any>;

  constructor(private contestService:ContestService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.contestService.onContestSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.selectedContest = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
