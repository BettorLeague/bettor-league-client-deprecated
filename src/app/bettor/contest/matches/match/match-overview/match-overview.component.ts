import {Component, Input, OnInit} from '@angular/core';
import {MatchModel} from '../../../../model/match.model';
import {PronosticModel} from '../../../../model/pronostic.model';

@Component({
  selector: 'app-match-overview',
  templateUrl: './match-overview.component.html',
  styleUrls: ['./match-overview.component.scss']
})
export class MatchOverviewComponent implements OnInit {

  @Input() match :MatchModel;
  @Input() pronostic:PronosticModel;

  constructor() { }

  ngOnInit() {
  }

}
