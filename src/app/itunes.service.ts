import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { SearchItem } from './searchItem.model';

@Injectable()
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private http: Http) {
    this.results = [];
    this.loading = false;
  }

  search(term: string) {
    let promise = new Promise((resolve, reject) => {
      let apiUrl = `${this.apiRoot}?term=${term}&media=music&limit=40`;
      this.http.get(apiUrl)
        .toPromise()
        .then(
          res => {
            console.log(res.json().results);
            this.results = res.json().results.map(item => {
                return new SearchItem(
                    item.trackName,
                    item.artistName,
                    item.trackViewUrl,
                    item.artworkUrl60,
                    item.artistId,
                    item.collectionName
                 )
            });
            resolve();
          },
          msg => {
            reject();
          }
        );
    });
    return promise;
  }
}