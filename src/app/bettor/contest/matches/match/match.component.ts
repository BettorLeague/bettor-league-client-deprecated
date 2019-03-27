import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CompetitionService} from '../../../services/competition.service';
import {MatchModel} from '../../../model/match.model';
import {takeUntil} from 'rxjs/operators';
import {CompetitionModel} from '../../../model/competition.model';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PronosticModel} from '../../../model/pronostic.model';
import {PlayerService} from '../../../services/player.service';
import {MatchSortingModel} from '../../../model/match.sorting.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  animations:fuseAnimations
})
export class MatchComponent implements OnInit,OnDestroy {
  @Input() filter :string;
  @Input() trie :MatchSortingModel;

  private unsubscribeAll: Subject<any>;
  matches:MatchModel[];
  selectedMatch:any[];
  pronostics:PronosticModel[];
  competitionInfo:CompetitionModel;

  constructor(private competitionService:CompetitionService,
              private playerService:PlayerService ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.competitionService.onCompetitionMatchSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(matches => {
        if(matches){
          this.matches = null;
          setTimeout(()=>{
            this.matches = matches;
          },1000);
        }
      });

    this.competitionService.onCompetitionSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(competitionData => {
        if(competitionData){
          this.competitionInfo = competitionData.competitionInfo;
        }
      });

    this.playerService.onPlayerSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(playerData => {
        if(playerData){
          this.pronostics = playerData.playerPronostic;
        }
      });

    this.playerService.onSelectedMatchChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(selectedMatch => {
        this.selectedMatch = selectedMatch;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.matches = null;
    this.selectedMatch = null;
    this.pronostics = null;
    this.competitionInfo = null;
  }


  getMatchPronostic(match :MatchModel):Observable<PronosticModel>{
    let result = new Observable<PronosticModel>();
    this.pronostics.forEach(pronostic => {
      if(pronostic.match.id == match.id){
        result = new Observable<PronosticModel>( observable => {
          observable.next(pronostic);
        })
      }
    });
    return result;
  }

  isMatchSelectable(matchStatus):boolean{
    return matchStatus == 'SCHEDULED'
  }

  onSelectedChange(matchId,status): void {
    if(this.isMatchSelectable(status)){
      this.playerService.toggleSelectedMatch(matchId);
    }
  }


}
