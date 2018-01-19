import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';

import { min } from 'lodash'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const HN_BASE_URL = 'https://hacker-news.firebaseio.com/v0'

const CATEGORY_MAP = {
  'top': 'topstories',
  'new': 'newstories',
  'best': 'beststories'
}

@Injectable()
export class DataService {

  constructor(private _http: HttpClient) { }

  getStories(category = 'top', page = 1) {
    let start = (min([page, 5]) - 1) * 10;
    let top$ = this._http.get<string[]>(`${HN_BASE_URL}/${CATEGORY_MAP[category]}.json`);
    return top$.map(stories => stories.slice(start, start + 10));
  }

  getItems(ids) {
    let items = [];
    ids.forEach(id => items.push(this.getItem(id)));
    return Observable.forkJoin(...items);
  }

  getItemWithDescendants(id) {
    return this.getItem(id).mergeMap(item => {
      if(item.kids && item.kids.length > 0) {
        return this.getItems(item.kids).map(kids => {
          item.children = kids;
          return item;
        });
      } else {
        return Observable.of(item);
      }
    });
  }

  getItem(id) {
    return this._http.get<any>(`${HN_BASE_URL}/item/${id}.json`);
  }
}
