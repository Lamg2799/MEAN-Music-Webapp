import { Component, OnInit, Input} from '@angular/core';
import { Music } from './music'


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  @Input() music! : Music;

  constructor() { }

  ngOnInit(): void {
  }

}
