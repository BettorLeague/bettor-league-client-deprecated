import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CompetitionModel} from '../model/competition.model';
import {TeamModel} from '../model/team.model';

@Injectable()
export class CompetitionService {

  baseUrl = environment.baseUrl;

  onCompetitionSelected: BehaviorSubject<any>;
  onCompetitionMatchSelected: BehaviorSubject<any>;
  onCompetitionStandingSelected: BehaviorSubject<any>;
  onCompetitionTeamSelected:BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onCompetitionSelected = new BehaviorSubject(null);
    this.onCompetitionMatchSelected = new BehaviorSubject(null);
    this.onCompetitionTeamSelected = new BehaviorSubject(null);
    this.onCompetitionStandingSelected = new BehaviorSubject(null);
  }

  public selectCompetition(competitionId): Promise<any>{

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCompetition(competitionId),
        this.getCompetitionTeams(competitionId),
        this.getCompetitionStanding(competitionId),
      ]).then(
        ([competition, teams, standing]) => {
          const competitionData = {
            competitionInfo : competition,
            competitionTeam : teams,
            competitionStanding: standing
          };
          this.onCompetitionSelected.next({...competitionData});
          resolve();
        }, reject);
    });

  }

  public selectCompetitionMatches(competitionId,matchDay,stage): Promise<any>{
    return new Promise((resolve, reject) => {
      this.getCompetitionMatches(competitionId,matchDay,stage)
        .then((response: any) => {
          this.onCompetitionMatchSelected.next(response);
          resolve(response);
        }, reject);

    });
  }

  public selectTeam(competitionId,team:TeamModel): Promise<any>{
    return new Promise((resolve, reject) => {
      this.getLast5match(competitionId,team.id)
        .then((response: any) => {
          const teamData = {
            last5match : response,
            teamInfo : team,
          };
          this.onCompetitionTeamSelected.next(teamData);
          resolve(response);
        }, reject);
    });
  }

  public selectStanding(standing):void{
    this.onCompetitionStandingSelected.next(standing);
  }

  public getCompetitions(): Observable<any>  {
    return this.http.get(this.baseUrl+`/api/competition`);
  }

  public getCompetition(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/competition/`+id).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
  public getCompetitionTeams(id): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/competition/`+id+`/teams`).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  public getCompetitionMatches(id,matchday,stage): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/competition/`+id+`/matches`+(matchday ? `?matchday=`+matchday : ``)+(stage ? `?stage=`+stage : ``)).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  public getCompetitionStanding(id): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/competition/`+id+`/standings?type=TOTAL`).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  public getLast5match(competitionId,teamId): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/competition/`+competitionId+`/teams/`+teamId).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

}
