import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {ContestService} from '../../../services/contest.service';
import {CompetitionService} from '../../../services/competition.service';
import {takeUntil} from 'rxjs/operators';
import {TeamModel} from '../../../model/team.model';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MatchModel} from '../../../model/match.model';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  animations: fuseAnimations
})
export class TeamInfoComponent implements OnInit {

  team:TeamModel;
  last5match:MatchModel[];
  private unsubscribeAll: Subject<any>;

  constructor(private competitionService:CompetitionService) {
    this.unsubscribeAll = new Subject();
  }


  ngOnInit() {
    this.competitionService.onCompetitionTeamSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(teamData => {
        if ( teamData ) {
          this.team = teamData.teamInfo;
          this.last5match = teamData.last5match.slice().reverse();

        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
