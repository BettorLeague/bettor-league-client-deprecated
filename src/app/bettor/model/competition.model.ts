import {Area} from './area.model';
import {SeasonModel} from './season.model';

export class CompetitionModel {
  id: number;
  name: string;
  code: string;
  logo: string;
  lastUpdated: number;
  area: Area;
  currentSeason: SeasonModel;
  availableStage: string[];
  availableGroup: string[];
}
