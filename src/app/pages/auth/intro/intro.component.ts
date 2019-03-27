import { Component, OnInit } from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {CompetitionService} from '../../../bettor/services/competition.service';
import {CompetitionModel} from '../../../bettor/model/competition.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations : fuseAnimations
})
export class IntroComponent implements OnInit {
  public index = 0;
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    loop:true,
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
      }
    }
  };

  competitions:CompetitionModel[] = []
  constructor(private competitionService:CompetitionService) { }

  ngOnInit() {
    this.competitionService.getCompetitions().subscribe(res => {
      this.competitions = res;
    })
  }

}
