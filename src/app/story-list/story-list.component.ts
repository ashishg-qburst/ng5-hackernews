import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  constructor(private dataService: DataService) { }

  stories = [];
  selectedStory;

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    let topTen = [];
    this.dataService.getTopStories().subscribe(stories => {
      this.dataService
          .getItems(stories)
          .subscribe(items => this.stories = items);
    });
  }

  selectStory(story) { this.selectedStory = story; }
}
