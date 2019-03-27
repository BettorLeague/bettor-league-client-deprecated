import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../shared/components/components.module';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {BettorComponent} from './bettor.component';
import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from '../guards/user/user.guard';
import { BettorStartComponent } from './bettor-start/bettor-start.component';
import { LeftComponent } from './sidenavs/left/left.component';
import { ProfilComponent } from './sidenavs/left/profil/profil.component';
import {BettorService} from './services/bettor.service';
import { UserContestComponent } from './sidenavs/left/user-contest/user-contest.component';
import { ContestComponent } from './contest/contest.component';
import {ContestService} from './services/contest.service';
import { RightComponent } from './sidenavs/right/right.component';
import { ContestInfoComponent } from './sidenavs/right/contest-info/contest-info.component';
import { MatchesComponent } from './contest/matches/matches.component';
import {UserService} from './services/user.service';
import { PlayersComponent } from './contest/players/players.component';
import {CompetitionService} from './services/competition.service';
import { MessagesComponent } from './contest/messages/messages.component';
import { StandingsComponent } from './contest/standings/standings.component';
import { StandingComponent } from './contest/standings/standing/standing.component';
import { TeamInfoComponent } from './sidenavs/right/team-info/team-info.component';
import { MatchComponent } from './contest/matches/match/match.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SubscribeContestComponent } from './sidenavs/left/subscribe-contest/subscribe-contest.component';
import {PlayerService} from './services/player.service';
import { SelectedBarComponent } from './contest/matches/selected-bar/selected-bar.component';
import { PronosticInfoComponent } from './sidenavs/right/pronostic-info/pronostic-info.component';
import {AvatarComponent} from './shared/avatar/avatar.component';
import { EmojiComponent } from './contest/messages/emoji/emoji.component';
import {ContenteditableModule} from 'ng-contenteditable';
import { MatchOverviewComponent } from './contest/matches/match/match-overview/match-overview.component';
import {OrderModule} from 'ngx-order-pipe';

const routes: Routes = [
  {
    path     : '**',
    component: BettorComponent,
    children : [],
    canActivate: [UserGuard],
    resolve  : {
      app: UserService
    }
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    FormsModule,
    PickerModule,
    OrderModule,
    ContenteditableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AvatarComponent, BettorComponent, BettorStartComponent, LeftComponent, ProfilComponent, UserContestComponent, ContestComponent, RightComponent, ContestInfoComponent, MatchesComponent, PlayersComponent, MessagesComponent, StandingsComponent, StandingComponent, TeamInfoComponent, MatchComponent, LoaderComponent, SubscribeContestComponent, SelectedBarComponent, PronosticInfoComponent, EmojiComponent, MatchOverviewComponent],
  providers   : [
    BettorService,
    ContestService,
    CompetitionService,
    PlayerService,
    UserService
  ]
})
export class BettorModule { }
