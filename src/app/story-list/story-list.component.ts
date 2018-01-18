import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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

  stories = [];
  selectedStory;

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    const params = this.route.snapshot.paramMap;
    const category = params.get('category');
    const page = +params.get('page');
    let topTen = [];

    this.dataService.getStories(category, page).subscribe(stories => {
      this.dataService
          .getItems(stories)
          .subscribe(items => this.stories = items);
    });
  }

  selectStory(story) { this.selectedStory = story; }
}
