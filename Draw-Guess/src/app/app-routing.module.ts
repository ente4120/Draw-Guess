import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { WordchoosingComponent } from './wordchoosing/wordchoosing.component';
import { DrawingComponent } from './drawing/drawing.component';
import { GuessingComponent } from './guessing/guessing.component';
import { WaitingComponent } from './waiting/waiting.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'word', component: WordchoosingComponent },
  { path: 'drowing/:word', component: DrawingComponent },
  { path: 'guessing', component: GuessingComponent },
  { path: 'waiting', component: WaitingComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
