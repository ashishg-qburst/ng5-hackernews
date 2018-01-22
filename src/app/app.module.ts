import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

import { DataService } from './data.service'

import { AppComponent } from './app.component';
import { StoryListComponent } from './story-list/story-list.component';
import { AppRoutingModule } from './app-routing.module';
import { StoryComponent } from './story/story.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    StoryComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgHttpLoaderModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
