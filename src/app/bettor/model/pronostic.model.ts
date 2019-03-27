import {MatchModel} from './match.model';
import {PlayerModel} from './player.model';

export class PronosticModel{
  id:number;
  match:MatchModel;
  player:PlayerModel;
  goalsAwayTeam:number;
  goalsHomeTeam:number;
}
