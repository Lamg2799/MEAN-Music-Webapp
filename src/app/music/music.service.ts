import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject, Subscription } from 'rxjs';
import { Music } from './music'
import { Constants } from 'src/constants'

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  
  original_music_list! : Music[];
  current_music_list$ : Subject<Music[]> = new Subject<Music[]>();
  getMusicSubscription : Subscription = new Subscription();

  constructor(private http: HttpClient, private constants: Constants) { }

  getMusic(): void {
    this.getMusicSubscription = this.http.get<Music[]>(this.constants.MUSIC_API_URL)
    .subscribe(music_list => {
      this.original_music_list = music_list;
      this.current_music_list$.next(this.original_music_list);}
    );
  }

  filterMusic(title : string): void {
    this.current_music_list$.next(this.original_music_list.filter(music => music.title.toLowerCase().includes(title.toLowerCase())));
  }
 
  uploadMusic(music: Music, audio_file: File, image_file: File): Observable<Music> {
    const form_data_image = new FormData();
    const form_data_audio = new FormData();
    form_data_image.append('file', image_file, image_file.name);
    form_data_audio.append('file', audio_file, audio_file.name);
    this.http.post(this.constants.MUSIC_API_URL + '/upload-file', form_data_image)
    .subscribe(response => console.log(response));
    this.http.post(this.constants.MUSIC_API_URL + '/upload-file', form_data_audio)
    .subscribe(response => console.log(response));
    return this.http.post<Music>(this.constants.MUSIC_API_URL + "/music-upload", music, this.constants.HTTP_OPTIONS); 
  }

  ngOnDestroy(): void {
    this.getMusicSubscription.unsubscribe();
  }
}
