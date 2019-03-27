import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {GuardsModule} from './guards/guards.module';
import {TokenInterceptor} from './shared/services/authentication/token.interceptor';
import {SplashScreenService} from '../@fuse/services/splash-screen.service';
import {TokenStorage} from './shared/services/authentication/token.storage';
import {GuestGuard} from './guards/guest/guest.guard';
import {UserGuard} from './guards/user/user.guard';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const routes: Routes = [
  {
    path        : 'auth',
    loadChildren: './pages/auth/authentication.module#AuthenticationModule',
    canActivate: [GuestGuard]
  },
  {
    path        : 'app',
    loadChildren: './bettor/bettor.module#BettorModule',
    canActivate: [UserGuard]
  },
  {
    path      : '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path      : '**',
    redirectTo: 'error/error-404'
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GuardsModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    TokenStorage,
    SplashScreenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
