import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContestModel} from '../../../model/contest.model';
import {ContestService} from '../../../services/contest.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseMatSidenavHelperService} from '../../../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-contest-info',
  templateUrl: './contest-info.component.html',
  styleUrls: ['./contest-info.component.scss'],
  animations:fuseAnimations
})
export class ContestInfoComponent implements OnInit,OnDestroy {

  contest:ContestModel;

  private unsubscribeAll: Subject<any>;

  constructor(private contestService:ContestService,
              private userService:UserService,
              private fuseMatSidenavHelperService: FuseMatSidenavHelperService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.onContestSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contest => {
        if ( contest ) {
          this.contest = contest.contestInfo;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  unSubscribe(): void{
    this.userService.unSubscribeToContest(this.contest.id).then(res => {
      this.fuseMatSidenavHelperService.getSidenav('bettor-right-sidenav').toggle()
    });
  }


}
