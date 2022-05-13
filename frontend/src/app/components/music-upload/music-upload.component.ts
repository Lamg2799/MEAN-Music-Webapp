import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Music } from '../../models/music/music';
import { MusicService } from '../../services/music/music.service';
import { UserService } from '../../services/user/user.service';
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
  username: string = this.userService.getUserInfo().username;
  private uploadSubscription: Subscription = new Subscription();

  musicUploadForm:FormGroup = new FormGroup({
    title:new FormControl(null,Validators.required),
    genre:new FormControl(null,Validators.required),
    artist:new FormControl(null,Validators.required),
    image_file: new FormControl(null,Validators.required),
    audio_file: new FormControl(null,Validators.required),
  })

  constructor(private toastr: ToastrService, private router : Router, private userService: UserService, private musicService: MusicService) { }

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
      this.toastr.error('The Provided Information is Invalid. Please Try Again.'); return;
    }

    var music : Music = {artist:this.musicUploadForm.get("artist")!.value, audio_file:this.audio_name,
    created_date: new Date(), genre:this.musicUploadForm.get("genre")!.value, 
    image_file:this.image_name, title:this.musicUploadForm.get("title")!.value };
    
    this.musicService.uploadMusic(music, this.audio_file, this.image_file)
    .then(
      (_) => {this.toastr.success('Successfully Uploaded Music'); this.router.navigate(['/']);}
    )
  }

  ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
  }



  ngOnInit(): void {
  }

}
