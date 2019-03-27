import {UserModel} from '../../shared/models/user.model';

export class PlayerModel {
  id: number;
  user: UserModel;
  points: number;
  goodPronostic: number;
  exactPronostic: number;
  totalPronostic: number;
}
