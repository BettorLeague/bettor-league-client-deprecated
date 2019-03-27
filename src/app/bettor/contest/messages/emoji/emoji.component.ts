import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmojiData} from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  @Input() message:HTMLElement;
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  select(event: {$event: MouseEvent, emoji: EmojiData}){
    let emoticonElement = <HTMLElement> event.$event.target;
    if (!emoticonElement.style.backgroundImage || emoticonElement.style.backgroundImage === '') {
      emoticonElement = <HTMLElement> emoticonElement.firstChild;
    }
    emoticonElement.style.outline = "none";
    let res = emoticonElement.outerHTML;
    res = res.replace("<span","<img");
    res = res.replace("</span>","");
    res = res.replace(">", "/>");
    res = res.replace("ng-reflect-ng-style=\"[object Object]\"","");
    res = res.replace("<!--bindings={ \"ng-reflect-ng-if\": \"false\" }-->","");
    this.selected.emit((this.message ? this.message : '') + res);

  }

}
