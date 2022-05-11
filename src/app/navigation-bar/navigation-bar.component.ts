import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { MusicService } from '../music/music.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  search : string = '';
  user? : User;
  private getLoggedInSubscription: Subscription = new Subscription();

  constructor(private user_service: UserService, private music_service: MusicService) { }

  ngOnInit(): void {
    this.getLoggedInSubscription = this.user_service.getLoggedIn().subscribe(user => { 
      this.user = user;
    });
  }

  filterMusicList() : void {
    this.music_service.filterMusic(this.search);
  }

  ngOnDestroy(): void {
    this.getLoggedInSubscription.unsubscribe();
  }
}
