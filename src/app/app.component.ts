import { Component } from '@angular/core';

import { SearchService } from './itunes.service';
import { fail } from 'assert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private loading: boolean = false;
  private noResults: boolean = false;

  constructor(private itunes: SearchService ) {
    this.doSearch('metallica');
  }

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then( () => {
      
      this.loading = false;
      this.noResults = this.itunes.results.length == 0 ? true : false;

    });
  }
}
