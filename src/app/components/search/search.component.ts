import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { GetSynonyms } from 'src/app/store/synonyms.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(400), // wait 300ms after the last event before emitting last value
      distinctUntilChanged() // only emit if value is different from previous value
    ).subscribe(value => this.store.dispatch(new GetSynonyms(value)));
  }
}
