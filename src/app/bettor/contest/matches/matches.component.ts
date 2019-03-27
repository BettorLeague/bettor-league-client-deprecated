import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition.service';
import {CompetitionModel} from '../../model/competition.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PlayerService} from '../../services/player.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatchSortingModel} from '../../model/match.sorting.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  animations:fuseAnimations
})
export class MatchesComponent implements OnInit,OnDestroy {

  private unsubscribeAll: Subject<any>;

  competitionInfo : CompetitionModel;
  matchdays: number[];
  selectedIndex : string;
  selectedMatch:any[];
  filterMatch:string = '';
  trieMatch:MatchSortingModel = {
    field : 'utcDate',
    asc :false
  };

  constructor(private competitionService:CompetitionService,private playerService:PlayerService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.matchdays = [];
    this.selectedIndex = '';

    this.competitionService.onCompetitionSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(competitionData => {
        if ( competitionData ) {
          this.competitionInfo = competitionData.competitionInfo;
          this.initMatches();
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
    this.competitionInfo = null;
    this.matchdays = null;
    this.selectedIndex =null;
    this.selectedMatch = null;
    this.filterMatch = null;
  }

  selectMatches(competitonId,matchday,stage){
    this.playerService.deselectAllMatches();
    this.competitionService.selectCompetitionMatches(competitonId,matchday,stage);
  }

  isRegularSeason():boolean{
    return (this.competitionInfo.availableStage.indexOf('REGULAR_SEASON') > -1);
  }

  initMatches(){
    if(this.isRegularSeason()){
      this.matchdays = Array.from(new Array(this.competitionInfo.currentSeason.availableMatchday),(val,index) => index+1);
      this.selectedIndex = this.matchdays[this.competitionInfo.currentSeason.currentMatchday - 1].toString();
      this.selectMatches(this.competitionInfo.id,this.competitionInfo.currentSeason.currentMatchday,null);
    }else{
      this.matchdays = [];
      this.selectedIndex = this.competitionInfo.availableStage[this.competitionInfo.availableStage.length -1].toString();
      this.selectMatches(this.competitionInfo.id,null,this.competitionInfo.availableStage[this.competitionInfo.availableStage.length -1]);
    }
  }

  selectMatchesByMatchDay(matchday){
    this.selectedIndex = matchday.toString();
    this.selectMatches(this.competitionInfo.id,matchday,null);
  }

  selectMatchesByStage(stage){
    this.selectedIndex = stage.toString();
    this.selectMatches(this.competitionInfo.id,null,stage);
  }


}
