import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { min, max } from 'lodash'

const PAGE_RANGE = {
  'min': 1,
  'max': 5
}

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  page;
  category;
  stories = [];
  selectedStory;
  prevPageAvailable: boolean = false;
  nextPageAvailable: boolean = false;

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.category = params.get('category');
    this.page = max([+params.get('page'), 1]);
    this.prevPageAvailable = (this.page - PAGE_RANGE['min']) > 0;
    this.nextPageAvailable = (PAGE_RANGE['max'] - this.page) > 0;
    this.getStories();
  }

  getStories() {
    let topTen = [];
    this.dataService.getStories(this.category, this.page).subscribe(stories => {
      this.dataService.getItems(stories).subscribe(items => this.stories = items);
    });
  }

  selectStory(story) { this.selectedStory = story; }
}
