import {TimeModel} from './time.model';

export class ScoreModel {
  id: number;
  winner: string;
  duration: string;
  fullTime: TimeModel;
  halfTime: TimeModel;
  extraTime: TimeModel;
  penalties: TimeModel;
}
