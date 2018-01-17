import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  host: { '(click)': 'getChildComments()' }
})
export class CommentComponent implements OnInit {

  @Input() comment;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getChildComments() {
    this.dataService.getItems(this.comment.kids).subscribe(items => this.comment.children = items);
  }
}
