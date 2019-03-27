import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageRequestModel} from '../model/message.request.model';
import {CompetitionService} from './competition.service';
import {ContestService} from './contest.service';

@Injectable()
export class PlayerService {

  baseUrl = environment.baseUrl;

  onPlayerSelected: BehaviorSubject<any>;

  selectedMatch: string[] = [];
  onSelectedMatchChanged: BehaviorSubject<any>;

  constructor(private http: HttpClient,
              private contestService:ContestService,
              private competitionService:CompetitionService) {
    this.onPlayerSelected = new BehaviorSubject(null);
    this.onSelectedMatchChanged = new BehaviorSubject([]);
  }

  public selectPlayer(contestId): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getPlayer(contestId),
        this.getPronostics(contestId),
      ]).then(
        ([player, pronostic]) => {
          const playerData = {
            playerInfo : player,
            playerPronostic : pronostic,
          };
          this.onPlayerSelected.next({...playerData});
          resolve(playerData);
        }, reject);
    });
  }

  public savePronostics(contestId,pronostics):Promise<any>{
    return new Promise((resolve, reject) => {
      this.postPronostics(contestId,pronostics)
        .subscribe(updatedChat => {
          resolve(updatedChat);
        }, reject);
    });
  }

  public saveMessage(contestId,message):Promise<any>{
    return new Promise((resolve, reject) => {
      this.postMessage(contestId,message)
        .subscribe(updatedChat => {
          this.contestService.selectContest(contestId);
          resolve(updatedChat);
        }, reject);
    });
  }

  public postPronostics(contestId,pronostics): Observable<any>{
    return this.http.post(this.baseUrl+`/api/player/contest/`+contestId+`/pronostic`,pronostics);
  }


  public getPronostics(contestId):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/player/contest/`+contestId+`/pronostic`).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  public postMessage(contestId,message:MessageRequestModel): Observable<any>  {
    return this.http.post(this.baseUrl+`/api/player/contest/`+contestId+`/message`,message);
  }

  public getPlayer(contestId):Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+`/api/player/contest/`+contestId).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }



  deselectAllMatches(): void {
    this.selectedMatch = [];
    this.onSelectedMatchChanged.next(this.selectedMatch);
  }

  selectAllMatches(): void {
    this.selectedMatch = [];
    this.competitionService.onCompetitionMatchSelected.getValue().map(match => {
      if(match.status == "SCHEDULED"){
        this.selectedMatch.push(match.id);
      }
    });
    this.onSelectedMatchChanged.next(this.selectedMatch);
  }

  toggleSelectedMatch(id): void {
    if ( this.selectedMatch.length > 0 )
    {
      const index = this.selectedMatch.indexOf(id);

      if ( index !== -1 ) {
        this.selectedMatch.splice(index, 1);
        this.onSelectedMatchChanged.next(this.selectedMatch);
        return;
      }
    }
    this.selectedMatch.push(id);
    this.onSelectedMatchChanged.next(this.selectedMatch);
  }


}
