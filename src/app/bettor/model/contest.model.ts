import {CompetitionModel} from './competition.model';

export class ContestModel {
  id: number;
  caption: string;
  type: string;
  competition: CompetitionModel;
  numberOfPlayers: number;
}
