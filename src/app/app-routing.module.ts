import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { StoryListComponent } from './story-list/story-list.component';

const routes: Routes = [
  { path: 'story/:id', component: StoryComponent },
  { path: ':category',
    children: [
      { path: '', component: StoryListComponent },
      { path: ':page', component: StoryListComponent }
    ]
  },
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: '**', component: StoryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
