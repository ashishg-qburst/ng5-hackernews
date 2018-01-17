import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  story;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getStory();
  }

  getStory() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getItemWithDescendants(id).subscribe(item => this.story = item);
  }
}
