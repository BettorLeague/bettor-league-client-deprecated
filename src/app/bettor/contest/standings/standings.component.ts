import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CompetitionService} from '../../services/competition.service';
import {StandingModel} from '../../model/standing.model';
import {CompetitionModel} from '../../model/competition.model';
import {promise} from 'selenium-webdriver';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit,OnDestroy {

  private unsubscribeAll: Subject<any>;

  competitionInfo : CompetitionModel;
  standings : StandingModel[];

  constructor(private competitionService:CompetitionService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.competitionService.onCompetitionSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(competitionData => {
        if ( competitionData ) {
          this.standings = competitionData.competitionStanding;
          this.competitionInfo = competitionData.competitionInfo;
          this.competitionService.selectStanding(this.standings[0]);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.standings = null;
    this.competitionInfo = null;
  }

  selectStandingByGroup(group){
    this.competitionService.selectStanding(this.standings[group]);
  }

  isRegularSeason():boolean{
    return (this.competitionInfo.availableStage.indexOf('REGULAR_SEASON') > -1);
  }

}
