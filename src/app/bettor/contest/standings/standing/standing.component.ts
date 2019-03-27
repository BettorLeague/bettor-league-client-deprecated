import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TableModel} from '../../../model/table.model';
import {StandingModel} from '../../../model/standing.model';
import {FuseMatSidenavHelperService} from '../../../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {CompetitionService} from '../../../services/competition.service';
import {BettorService} from '../../../services/bettor.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CompetitionModel} from '../../../model/competition.model';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss']
})
export class StandingComponent implements OnInit,OnDestroy {

  columnDefinitions = [
    { def: 'position', showMobile: true },
    { def: 'name', showMobile: true },
    { def: 'points', showMobile: true },
    { def: 'playedGames', showMobile: true },
    { def: 'won', showMobile: true },
    { def: 'draw', showMobile: true },
    { def: 'lost', showMobile: true },
    { def: 'goalsFor', showMobile: false },
    { def: 'goalsAgainst', showMobile: false },
    { def: 'goalDifference', showMobile: false },
  ];


  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<TableModel>();

  standing:StandingModel;
  competition:CompetitionModel;
  private unsubscribeAll: Subject<any>;
  constructor(
    private competitionService: CompetitionService,
    private bettorService: BettorService,
    private fuseMatSidenavHelperService: FuseMatSidenavHelperService) {
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
    this.competitionService.onCompetitionStandingSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(standing => {
        if ( standing ) {
          this.standing = standing;
          this.iniTable(this.standing.table);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.dataSource = null;
    this.standing= null;
    this.competition =null;
  }

  selectTeam(team): void {
    this.competitionService.selectTeam(this.competition.id,team);
    this.bettorService.onRightSidenavViewChanged.next("team-info");
    this.fuseMatSidenavHelperService.getSidenav('bettor-right-sidenav').toggle();
  }

  iniTable(table){
    this.dataSource = new MatTableDataSource<TableModel>(table);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'name': return item.team.name;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }






}
