import { Component, OnInit, Input} from '@angular/core';
import { Music } from './music'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  @Input() music! : Music;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  playSong() {
    this.router.navigate(['/music', this.music.title, {music: JSON.stringify(this.music)}]);
  }

}
