import {Component, OnDestroy, OnInit} from '@angular/core';
import {BettorService} from '../../../services/bettor.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {UserService} from '../../../services/user.service';
import {UserModel} from '../../../../shared/models/user.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  animations: fuseAnimations
})
export class ProfilComponent implements OnInit,OnDestroy {

  user:UserModel;

  private unsubscribeAll: Subject<any>;

  constructor(private bettorService:BettorService,
              private userService:UserService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.userService.onUserUpdated
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(user => {
        if ( user ) {
          this.user = user;
        }
      });
  }

  changeLeftSidenavView(view): void {
    this.bettorService.onLeftSidenavViewChanged.next(view);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
