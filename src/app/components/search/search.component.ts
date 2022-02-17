import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { debounceTime, distinctUntilChanged, filter } from "rxjs";
import { GetSynonyms } from "src/app/store/synonyms.actions";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  search = new FormControl("", [Validators.pattern("^[A-Za-z ]+$")]);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(400), // wait 300ms after the last event before emitting last value
        filter(() => this.search.valid), // only dispatch action for valid input
        distinctUntilChanged() // only emit if value is different from previous value
      )
      .subscribe((value) => this.store.dispatch(new GetSynonyms(value)));
  }

  keyPressLetters(event: any) {
    // Prevent input of non letters
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
