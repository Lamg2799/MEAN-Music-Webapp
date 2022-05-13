import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard/auth-guard.service';
import { MusicUploadComponent } from './components/music-upload/music-upload.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';

const routes: Routes = [
  { path: '', component: MusicListComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'log-in', component: LogInComponent},
  { path: 'music/:song', component: MusicPlayerComponent},
  { path: 'music-upload', component: MusicUploadComponent, canActivate : [AuthGuard]},
  { path: 'manage-account', component: ManageAccountComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }