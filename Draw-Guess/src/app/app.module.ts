import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WordchoosingComponent } from './wordchoosing/wordchoosing.component';
import { DrawingComponent } from './drawing/drawing.component';
import { GuessingComponent } from './guessing/guessing.component';
import { WaitingComponent } from './waiting/waiting.component';
import { WelcomeComponent } from './welcome/welcome.component';


import { AppRoutingModule } from './app-routing.module';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    WordchoosingComponent,
    DrawingComponent,
    GuessingComponent,
    WaitingComponent,
    WelcomeComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
