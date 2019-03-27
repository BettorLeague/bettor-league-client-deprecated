import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Subject} from 'rxjs';
import {ContestService} from '../../services/contest.service';
import {takeUntil} from 'rxjs/operators';
import {MessageModel} from '../../model/message.model';
import {NgForm} from '@angular/forms';
import {PlayerService} from '../../services/player.service';
import {MessageRequestModel} from '../../model/message.request.model';
import {ContestModel} from '../../model/contest.model';
import {PlayerModel} from '../../model/player.model';
import {fuseAnimations} from '../../../../@fuse/animations';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '320px',
      })),
      state('closed', style({
        height: '0px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class MessagesComponent implements OnInit,OnDestroy,AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  private unsubscribeAll: Subject<any>;

  replyInput: any;
  messages:MessageModel[];
  contest:ContestModel;
  player:PlayerModel;
  showEmoji:boolean;
  message;

  constructor(private contestService: ContestService,private playerService:PlayerService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.showEmoji = false;
    this.scrollToBottom();
    this.contestService.onContestSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(contestData => {
        if ( contestData ) {
          this.contest = contestData.contestInfo;
          this.messages = contestData.contestMessage;
        }
      });

    this.playerService.onPlayerSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(player => {
        this.player = null;
        if ( player ) {
          this.player = player.playerInfo;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.replyInput = null;
    this.messages = null;
    this.contest = null;
    this.player = null;
    this.showEmoji = null;
    this.message = null;
  }


  reply(): void {
    if ( !this.message ) {
      return;
    }
    const message = new MessageRequestModel();
    message.content = this.message;
    this.message = '';
    this.playerService.saveMessage(this.contest.id, message);
  }

  isFirstMessageOfGroup(message, i): boolean {
    return (i === 0 || this.messages[i - 1] && this.messages[i - 1].player.id !== message.player.id);
  }

  isLastMessageOfGroup(message, i): boolean {
    return (i === this.messages.length - 1 || this.messages[i + 1] && this.messages[i + 1].player.id !== message.player.id);
  }


  toggle() {
    this.showEmoji = !this.showEmoji;
  }

  onEmojiSelected(param){
    this.message = param;
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }



}
