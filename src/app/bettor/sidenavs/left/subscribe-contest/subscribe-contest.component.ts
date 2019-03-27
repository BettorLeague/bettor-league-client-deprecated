import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {BettorService} from '../../../services/bettor.service';
import {ContestService} from '../../../services/contest.service';
import {ContestModel} from '../../../model/contest.model';

@Component({
  selector: 'app-subscribe-contest',
  templateUrl: './subscribe-contest.component.html',
  styleUrls: ['./subscribe-contest.component.scss']
})
export class SubscribeContestComponent implements OnInit {

  private unsubscribeAll: Subject<any>;
  publicContest:ContestModel[];

  constructor(private bettorService:BettorService,
              private userService:UserService,
              private contestService:ContestService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.getContest('PUBLIC').subscribe(res => {
      this.publicContest = res;
    })
  }

  changeLeftSidenavView(view): void {
    this.bettorService.onLeftSidenavViewChanged.next(view);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  subscribe(contestId){
    this.userService.subscribeToContest(contestId).then(res => {
      this.changeLeftSidenavView('user-contest');
    })
  }

}
