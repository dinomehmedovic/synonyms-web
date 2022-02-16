import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(400), // wait 300ms after the last event before emitting last value
      filter(v => v !== ''), // filter empty value
      distinctUntilChanged() // only emit if value is different from previous value
    ).subscribe(value => console.log('Search: ', value));
  }

}
