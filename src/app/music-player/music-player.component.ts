import { Component, OnInit } from '@angular/core';
import { Music } from '../music/music';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})

export class MusicPlayerComponent implements OnInit {

  music! : Music;


  constructor(private route: ActivatedRoute, public constants: Constants) {}

  ngOnInit(): void {
    this.music = JSON.parse(this.route.snapshot.paramMap.get('music')!);
  }

}
