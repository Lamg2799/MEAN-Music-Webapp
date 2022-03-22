import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Music } from './music'

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  MUSIC_API_URL = "http://localhost:3600/music";

  constructor(private http: HttpClient) { }

  getMusic(): Observable<Music[]> {
    return this.http.get<Music[]>(this.MUSIC_API_URL);
  }
}
