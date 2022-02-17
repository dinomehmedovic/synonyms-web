import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SynonymsState } from 'src/app/store/synonyms.state';

@Component({
  selector: 'app-synonyms-list',
  templateUrl: './synonyms-list.component.html',
  styleUrls: ['./synonyms-list.component.scss']
})
export class SynonymsListComponent implements OnInit {
  @Select(SynonymsState.synonyms) synonyms$!: Observable<Array<string>>;
  constructor() { }

  ngOnInit(): void {
  }

}
