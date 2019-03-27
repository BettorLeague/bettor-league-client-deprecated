import {RouterModule, Routes} from '@angular/router';
import {IntroComponent} from './intro/intro.component';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../shared/components/components.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {CompetitionService} from '../../bettor/services/competition.service';

const routes: Routes = [
  {
    path        : 'login',
    component: LoginComponent
  },
  {
    path        : 'register',
    component: RegisterComponent
  },
  {
    path      : '**',
    redirectTo: 'login'
  }
];

@NgModule({

  declarations: [IntroComponent,LoginComponent,RegisterComponent],
  imports: [
    ComponentsModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers   : [
    CompetitionService
  ]
})
export class AuthenticationModule { }
