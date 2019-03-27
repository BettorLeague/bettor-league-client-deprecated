import {AuthorityModel} from './authority.model';
import {TeamModel} from '../../bettor/model/team.model';

export class UserModel {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  authorities: AuthorityModel[];
  country: string;
  birthDate: Date;
  sex: string;
  favoriteTeam: TeamModel;
  quote: string;
  level: number;
}
