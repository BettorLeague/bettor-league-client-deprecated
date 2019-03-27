
import {NgModule} from "@angular/core";
import {FuseDirectivesModule} from "./directives/directives";
import {SplashScreenService} from "./services/splash-screen.service";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FuseMatchMediaService} from './services/match-media.service';
import {FusePipesModule} from './pipes/pipes.module';


@NgModule({
  imports  : [
    FuseDirectivesModule,
    FusePipesModule
  ],
  providers: [
    SplashScreenService,
    FuseMatchMediaService
  ],
  exports  : [
    FuseDirectivesModule,
    FusePipesModule
  ]
})
export class FuseModule { }
