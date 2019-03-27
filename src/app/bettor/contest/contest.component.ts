import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {ContestService} from '../services/contest.service';
import {takeUntil} from 'rxjs/operators';
import {ContestModel} from '../model/contest.model';
import {PlayerModel} from '../model/player.model';
import {MessageModel} from '../model/message.model';
import {FuseMatSidenavHelperService} from '../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {BettorService} from '../services/bettor.service';
import {CompetitionService} from '../services/competition.service';
import {MatDrawer} from '@angular/material';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit,OnDestroy {

  @ViewChild('pronosticDrawer') pronosticDrawer: MatDrawer;

  contest:ContestModel;
  contestPlayer:PlayerModel[];
  contestMessage:MessageModel[];

  private unsubscribeAll: Subject<any>;

  constructor(private contestService:ContestService,
              private bettorService: BettorService,
              private userService:UserService,
              private competitionService:CompetitionService,
              private fuseMatSidenavHelperService: FuseMatSidenavHelperService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.bettorService.pronosticDrawer = this.pronosticDrawer;

    this.contestService.onContestSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contestData => {
        if ( contestData ) {
          this.contest = contestData.contestInfo;
          this.contestPlayer = contestData.contestPlayer;
          this.contestMessage = contestData.contestMessage;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getContestInfo(): void {
    this.bettorService.onRightSidenavViewChanged.next("contest-info");
    this.fuseMatSidenavHelperService.getSidenav('bettor-right-sidenav').toggle();
  }

  unsubscribe(): void{
    this.userService.unSubscribeToContest(this.contest.id);
  }

}
