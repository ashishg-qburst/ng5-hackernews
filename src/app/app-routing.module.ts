import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryComponent } from './story/story.component'
import { StoryListComponent } from './story-list/story-list.component'

const routes: Routes = [
  { path: 'list', component: StoryListComponent },
  { path: 'story/:id', component: StoryComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
