import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service'

import { AppComponent } from './app.component';
import { StoryListComponent } from './story-list/story-list.component';


@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
