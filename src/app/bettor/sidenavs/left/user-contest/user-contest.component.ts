import {Component, OnDestroy, OnInit} from '@angular/core';
import {BettorService} from '../../../services/bettor.service';
import {Subject} from 'rxjs';
import {ContestModel} from '../../../model/contest.model';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ContestService} from '../../../services/contest.service';
import {ObservableMedia} from '@angular/flex-layout';
import {FuseMatSidenavHelperService} from '../../../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {UserService} from '../../../services/user.service';
import {CompetitionService} from '../../../services/competition.service';
import {AuthService} from '../../../../shared/services/authentication/auth.service';
import {SplashScreenService} from '../../../../../@fuse/services/splash-screen.service';
import {Router} from '@angular/router';
import {PlayerService} from '../../../services/player.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-contest',
  templateUrl: './user-contest.component.html',
  styleUrls: ['./user-contest.component.scss'],
  animations: fuseAnimations
})
export class UserContestComponent implements OnInit,OnDestroy {

  searchText: string;
  publicContest:ContestModel[];
  privateContest:ContestModel[];
  selectedContest:ContestModel;

  private unsubscribeAll: Subject<any>;

  constructor(private bettorService:BettorService,
              private contestService:ContestService,
              private competitionService:CompetitionService,
              private authService:AuthService,
              private splashScreenService:SplashScreenService,
              private playerService:PlayerService,
              private router:Router,
              private fuseMatSidenavHelperService: FuseMatSidenavHelperService,
              public  observableMedia: ObservableMedia,
              private userService:UserService) {
    this.searchText = '';
    this.unsubscribeAll = new Subject();
    this.publicContest = [];
    this.privateContest = [];
  }

  ngOnInit() {

    this.contestService.onContestSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contestData => {
        if ( contestData ) {
          this.selectedContest = contestData.contestInfo;
        }
      });

    this.userService.onPublicContestUpdated
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contests => {
        if ( contests ) {
          this.publicContest = contests;
        }
      });

    this.userService.onPrivateContestUpdated
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contests => {
        if ( contests ) {
          this.privateContest = contests;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


  changeLeftSidenavView(view): void {
    this.bettorService.onLeftSidenavViewChanged.next(view);
  }

  selectContest(contestId,competitionId): void {
    this.contestService.selectContest(contestId);
    this.competitionService.selectCompetition(competitionId);
    this.playerService.selectPlayer(contestId);
    if ( !this.observableMedia.isActive('gt-md') ) {
      this.fuseMatSidenavHelperService.getSidenav('bettor-left-sidenav').toggle();
    }
  }

  logout(){
    this.authService.logout();
    this.splashScreenService.show();
    setTimeout(() => {
      this.router.navigate(['auth/login']).then(res => {
        this.splashScreenService.hide();
      });
    },1000);
  }

}
