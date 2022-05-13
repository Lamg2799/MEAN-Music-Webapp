import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Music } from '../music/music';
import { MusicService } from '../music/music.service';
import { UserService } from '../user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-music-upload',
  templateUrl: './music-upload.component.html',
  styleUrls: ['./music-upload.component.css']
})
export class MusicUploadComponent implements OnInit {

  audio_name! : string;
  image_name! : string;
  audio_file! : File;
  image_file! : File;
  username: string = this.user_service.getUserInfo().username;
  private uploadSubscription: Subscription = new Subscription();

  musicUploadForm:FormGroup = new FormGroup({
    title:new FormControl(null,Validators.required),
    genre:new FormControl(null,Validators.required),
    artist:new FormControl(null,Validators.required),
    image_file: new FormControl(null,Validators.required),
    audio_file: new FormControl(null,Validators.required),
  })

  constructor(private toastr: ToastrService, private router : Router, private user_service: UserService, private music_service: MusicService) { }

  handleImageUpload(event : Event) {
    this.image_file = (event.target as HTMLInputElement).files![0];
    this.image_name = this.image_file.name;
  }

  handleAudioUpload(event : Event) {
    this.audio_file = (event.target as HTMLInputElement).files![0];
    this.audio_name = this.audio_file.name;
  }

  upload(){
    if(!this.musicUploadForm.valid){
      console.log('Invalid Form'); return;
    }
    var music : Music = {artist:this.musicUploadForm.get("artist")!.value, audio_file:this.audio_name,
    created_date: new Date(), genre:this.musicUploadForm.get("genre")!.value, 
    image_file:this.image_name, title:this.musicUploadForm.get("title")!.value };
    this.music_service.uploadMusic(music, this.audio_file, this.image_file)
    .then(
      data => {this.toastr.success('Successfully Uploaded Music'); this.router.navigate(['/']);}
    )
  }

  ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
  }



  ngOnInit(): void {
  }

}
