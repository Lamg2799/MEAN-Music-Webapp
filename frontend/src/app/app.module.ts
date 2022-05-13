import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { MusicComponent } from './components/music/music.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MusicUploadComponent } from './components/music-upload/music-upload.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicListComponent,
    MusicComponent,
    NavigationBarComponent,
    SignUpComponent,
    LogInComponent,
    MusicPlayerComponent,
    MusicUploadComponent,
    ManageAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
