import {Component, OnDestroy, OnInit} from '@angular/core';
import {BettorService} from '../../../services/bettor.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CompetitionService} from '../../../services/competition.service';
import {PlayerService} from '../../../services/player.service';
import {MatchModel} from '../../../model/match.model';
import {PronosticModel} from '../../../model/pronostic.model';
import {ContestModel} from '../../../model/contest.model';
import {ContestService} from '../../../services/contest.service';
import {PlayerModel} from '../../../model/player.model';
import {FuseMatSidenavHelperService} from '../../../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {CompetitionModel} from '../../../model/competition.model';

@Component({
  selector: 'app-pronostic-info',
  templateUrl: './pronostic-info.component.html',
  styleUrls: ['./pronostic-info.component.scss']
})
export class PronosticInfoComponent implements OnInit,OnDestroy {


  private unsubscribeAll: Subject<any>;
  contestInfo:ContestModel;
  playerInfo:PlayerModel;
  matches:MatchModel[] = [];
  playerPronostics:PronosticModel[];
  newPronostics:PronosticModel[] = [];
  competition:CompetitionModel;
  constructor(public bettorService:BettorService,
              private contestService:ContestService,
              private fuseMatSidenavHelperService: FuseMatSidenavHelperService,
              private competitionService:CompetitionService,
              private playerService:PlayerService) {

    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.competitionService.onCompetitionSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(competitionData => {
        if ( competitionData ) {
          this.competition = competitionData.competitionInfo;
        }
      });

    this.competitionService.onCompetitionMatchSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(matches => {
        if ( matches ) {
          this.matches = matches;
        }
      });
    this.contestService.onContestSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contestData => {
        if ( contestData ) {
          this.contestInfo = contestData.contestInfo;
        }
      });
    this.playerService.onPlayerSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(playerData => {
        if ( playerData ) {
          this.playerInfo = playerData.playerInfo;
          this.playerPronostics = playerData.playerPronostic;
        }
      });
    this.playerService.onSelectedMatchChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(selection => {
        if ( selection.length > 0 ) {
          this.newPronostics = [];
          selection.map(id => {
            let match = this.matches.find(match => match.id === id);
            let prono = this.playerPronostics.find(pronostic => pronostic.match.id === id);
            if(prono){
              this.newPronostics.push(prono)
            }else {
              let pronostic = new PronosticModel();
              pronostic.match = match;
              pronostic.goalsHomeTeam = 0;
              pronostic.goalsAwayTeam = 0;
              this.newPronostics.push(pronostic);
            }
          });
        }
      });

  }

  saveProno():void{
    this.newPronostics.map(prono => {
      prono.goalsAwayTeam < 0 ? prono.goalsAwayTeam = 0 : null;
      prono.goalsHomeTeam < 0 ? prono.goalsHomeTeam = 0 : null;
    });
    this.playerService.savePronostics(this.contestInfo.id,this.newPronostics).then(res => {
      this.playerService.selectPlayer(this.contestInfo.id);
      this.playerService.deselectAllMatches();
      this.bettorService.pronosticDrawer.close();

    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  selectTeam(team): void {
    this.competitionService.selectTeam(this.competition.id,team);
    this.bettorService.onRightSidenavViewChanged.next("team-info");
    this.fuseMatSidenavHelperService.getSidenav('bettor-right-sidenav').toggle();
  }
}
