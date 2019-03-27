import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ContestService} from './contest.service';

@Injectable()
export class UserService implements Resolve<any>{

  baseUrl = environment.baseUrl;

  onPublicContestUpdated: BehaviorSubject<any>;
  onPrivateContestUpdated: BehaviorSubject<any>;
  onUserUpdated: BehaviorSubject<any>;

  constructor(private http: HttpClient,private contestService:ContestService){
    this.onPublicContestUpdated = new BehaviorSubject(null);
    this.onPrivateContestUpdated = new BehaviorSubject(null);
    this.onUserUpdated = new BehaviorSubject(null);
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCurrentPublicContest(),
        this.getCurrentPrivateContest(),
        this.getCurrentUser()
      ]).then(
        ([publicContest, privateContest, user]) => {
          this.onPrivateContestUpdated.next(privateContest);
          this.onPublicContestUpdated.next(publicContest);
          this.onUserUpdated.next(user);
          resolve();
        },
        reject
      );
    });
  }


  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUser()
        .subscribe((response: any) => {
          this.onUserUpdated.next(response);
          resolve(response);
        }, reject);
    });
  }

  getCurrentPublicContest(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUserContests("PUBLIC")
        .subscribe((response: any) => {
          this.onPublicContestUpdated.next(response);
          resolve(response);
        }, reject);
    });
  }

  getCurrentPrivateContest(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUserContests("PRIVATE")
        .subscribe((response: any) => {
          this.onPrivateContestUpdated.next(response);
          resolve(response);
        }, reject);
    });
  }

  subscribeToContest(contestId):Promise<any>{
    return new Promise((resolve, reject) => {
      this.contestSubscribe(contestId)
        .subscribe(response=> {
          this.getCurrentPublicContest();
          this.getCurrentPrivateContest();
          resolve(response);
        }, reject);
    });
  }

  unSubscribeToContest(contestId):Promise<any>{
    return new Promise((resolve, reject) => {
      this.contestUnSubscribe(contestId)
        .subscribe(response=> {
          this.getCurrentPublicContest();
          this.getCurrentPrivateContest();
          this.contestService.unSelectContest();
          resolve(response);
        }, reject);
    });
  }


  public getUser(): Observable<any>  {
    return this.http.get(this.baseUrl+`/api/auth/user`);
  }

  public getUserContests(type): Observable<any> {
    return this.http.get(this.baseUrl+`/api/user/contest`+(type ? `?type=`+type : ``) );
  }

  public contestSubscribe(contestId): Observable<any>{
    return this.http.post(this.baseUrl+`/api/user/contest/`+contestId,null);
  }

  public contestUnSubscribe(contestId): Observable<any> {
    return this.http.patch(this.baseUrl+`/api/user/contest/`+contestId,null);
  }

}
