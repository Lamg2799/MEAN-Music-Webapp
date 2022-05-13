import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';
import { MusicService } from '../../services/music/music.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  search : string = '';
  user? : User;
  private getLoggedInSubscription: Subscription = new Subscription();

  constructor(private userService: UserService, private musicService: MusicService) { }

  ngOnInit(): void {
    this.getLoggedInSubscription = this.userService.getLoggedIn().subscribe(user => { 
      this.user = user;
    });
  }

  filterMusicList() : void {
    this.musicService.filterMusic(this.search);
  }

  ngOnDestroy(): void {
    this.getLoggedInSubscription.unsubscribe();
  }
}
