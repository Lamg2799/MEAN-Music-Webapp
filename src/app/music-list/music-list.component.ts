import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Music } from '../music/music'
import { MusicComponent } from '../music/music.component';
import { MusicService } from '../music/music.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  music_list$! : Observable<Music[]>;

  constructor(private music_service: MusicService) { }

  ngOnInit(): void {
    this.getMusic()
  }

  getMusic(): void {
    this.music_list$ = this.music_service.getMusic();
  }


}
