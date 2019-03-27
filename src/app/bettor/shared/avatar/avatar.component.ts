import { Component, Input, OnInit } from '@angular/core';
import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() userEmail: string;
  avatar_url: string;

  constructor() { }

  ngOnInit() {
    this.avatar_url = "https://www.gravatar.com/avatar/" + Md5.hashStr(this.userEmail).toString() + "?d=identicon"
  }

}
