import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const HN_BASE_URL = 'https://hacker-news.firebaseio.com/v0'

@Injectable()
export class DataService {

  constructor(private _http: HttpClient) { }

  getTopStories() {
    let top$ = this._http.get<string[]>(`${HN_BASE_URL}/topstories.json`);
    return top$.map(stories => stories.slice(0, 9));
  }

  getItems(ids) {
    let items = [];
    ids.forEach(id => items.push(this.getItem(id)));
    return Observable.forkJoin(...items);
  }

  getItemWithDescendants(id) {
    return this.getItem(id).mergeMap(item => {
      return this.getItems(item.kids).map(kids => {
        item.kids = kids;
        return item;
      });
    });
  }

  getItem(id) {
    return this._http.get<any>(`${HN_BASE_URL}/item/${id}.json`);
  }
}
