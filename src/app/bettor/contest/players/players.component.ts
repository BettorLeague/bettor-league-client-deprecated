import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {PlayerModel} from '../../model/player.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContestService} from '../../services/contest.service';
import {StandingPlayerModel} from '../../model/standingPlayer.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit,OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<StandingPlayerModel>();

  players:StandingPlayerModel[];
  filterPlayer:string;

  private unsubscribeAll: Subject<any>;

  constructor(private contestService: ContestService) {

    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.contestService.onContestSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contestData => {
        if ( contestData ) {
          this.players = contestData.contestPlayer;
          this.initTable(this.players);
        }
      });


  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.players = null;
    this.filterPlayer = null;
  }

  applyFilter() {
    this.dataSource.filter = this.filterPlayer.trim().toLowerCase();
  }

  initTable(players:StandingPlayerModel[]){
    this.dataSource = new MatTableDataSource<StandingPlayerModel>(players);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'name': return item.player.user.username;
        case 'points': return item.player.points;
        case 'goodPronostic': return item.player.goodPronostic;
        case 'exactPronostic': return item.player.exactPronostic;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.player.user.username;
      return dataStr.indexOf(filter) != -1;
    }
  }

  getWidthPercent(prono,total):string{
    let res = '';
    let pourcent = (prono / total) * 100;
    if(total == 0){
      res = '0%';
    }else{
      res = pourcent+"%";
    }
    return res;
  }
}
