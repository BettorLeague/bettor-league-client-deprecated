import {TeamModel} from './team.model';
import {ScoreModel} from './score.model';
import {SeasonModel} from './season.model';

export class MatchModel {
  id: number;
  season: SeasonModel;
  utcDate: Date;
  status: string;
  matchday: number;
  stage: string;
  group: string;
  homeTeam: TeamModel;
  awayTeam: TeamModel;
  score: ScoreModel;
  lastUpdated: number;
}
