import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryListComponent } from './story-list/story-list.component'

const routes: Routes = [
  { path: 'list', component: StoryListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
