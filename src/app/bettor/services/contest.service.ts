import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CompetitionService} from './competition.service';

@Injectable()
export class ContestService {

  baseUrl = environment.baseUrl;

  onContestSelected: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onContestSelected = new BehaviorSubject(null);
  }

  public selectContest(contestId): Promise<any>{
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getContestById(contestId),
        this.getContestStanding(contestId),
        this.getContestMessages(contestId)
      ]).then(
        ([contest, player, message]) => {
          const contestData = {
            contestInfo : contest,
            contestPlayer : player,
            contestMessage: message
          };
          this.onContestSelected.next(contestData);
          resolve();
        }, reject);
    });

  }

  public unSelectContest():void{
    this.onContestSelected.next(null);
  }

  public getContest(type): Observable<any>  {
    return this.http.get(this.baseUrl+'/api/contest'+(type ? '?type='+type : ''));
  }

  public getContestById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl +`/api/contest/`+id).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  public getContestPlayers(id): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/contest/`+id+`/players`).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  public getContestMessages(id): Promise<any>  {
    return new Promise((resolve, reject) => {  this.http.get(this.baseUrl+`/api/contest/`+id+`/messages`).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  public getContestStanding(contestId):Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/contest/`+contestId+`/standing`).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
}
