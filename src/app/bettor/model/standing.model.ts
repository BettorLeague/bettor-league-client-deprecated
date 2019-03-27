import {TableModel} from './table.model';

export interface StandingModel {
  id: number;
  stage: string;
  type: string;
  group: string;
  table: TableModel[];
}
