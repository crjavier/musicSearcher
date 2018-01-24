import { Component } from '@angular/core';

import { SearchService } from './itunes.service';
import { fail } from 'assert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading: boolean = false;
  noResults: boolean = false;
  songs: SearchService = this.itunes;

  constructor(private itunes: SearchService ) {
    this.doSearch('metallica');
  }

  doSearch(term: string) {
    this.loading = true;
    this.songs.search(term).then( () => {
      
      this.loading = false;
      this.noResults = this.songs.results.length == 0 ? true : false;

    });
  }
}
