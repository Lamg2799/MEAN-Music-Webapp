import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicComponent } from './music/music.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicUploadComponent } from './music-upload/music-upload.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';

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
