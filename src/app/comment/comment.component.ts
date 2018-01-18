import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  host: { '(click)': 'onClick($event)' }
})
export class CommentComponent implements OnInit {

  @Input() comment;
  currentClasses: {};
  hasKids: boolean = false;
  fetchedKids: boolean = false;
  closedComment: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.hasKids = (this.comment.kids && this.comment.kids.length > 0) ? true : false;
    this.closedComment = this.comment.closed == false ? false : true;
    this.setCurrentClasses();
  }

  setCurrentClasses() {
    this.currentClasses =  {
      'no-kids': !this.hasKids,
      'has-kids': this.hasKids,
      'closed': this.closedComment
    };
    this.saveHistory();
  }

  saveHistory() {
    this.comment.closed = this.closedComment;
  }

  onClick(event) {
    if(this.hasKids) {
      if(this.closedComment) {
        if(!this.fetchedKids && !this.comment.children) {
          this.getChildComments();
        }
        this.openComment();
      } else {
        this.closeComment();
      }
    }
    this.setCurrentClasses();
    event.stopPropagation();
  }

  getChildComments() {
    this.dataService.getItems(this.comment.kids).subscribe(items => {
      this.comment.children = items;
      this.fetchedKids = true;
    });
  }

  closeComment() {
    this.closedComment = true;
  }

  openComment() {
    this.closedComment = false;
  }
}
