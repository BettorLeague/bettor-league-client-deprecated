import {Component, OnInit} from '@angular/core';
import {SplashScreenService} from '../@fuse/services/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private splashScreenService : SplashScreenService) {}

  ngOnInit(): void {
  }


}
