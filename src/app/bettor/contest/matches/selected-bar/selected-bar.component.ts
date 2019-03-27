import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PlayerService} from '../../../services/player.service';
import {takeUntil} from 'rxjs/operators';
import {BettorService} from '../../../services/bettor.service';

@Component({
  selector: 'app-selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit,OnDestroy {
  @Input() filter :string;

  private unsubscribeAll: Subject<any>;
  selectedMatch:any[];

  constructor(public playerService:PlayerService,
              public bettorService:BettorService) {
    this.unsubscribeAll = new Subject();
  }


  ngOnInit() {
    this.playerService.onSelectedMatchChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(selectedMatch => {
        this.selectedMatch = selectedMatch;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.selectedMatch = null;
  }

}
