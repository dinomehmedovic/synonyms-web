import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AddSynonyms, DeleteSynonym } from "src/app/store/synonyms.actions";
import { SynonymsState } from "src/app/store/synonyms.state";

@Component({
  selector: "app-synonyms-list",
  templateUrl: "./synonyms-list.component.html",
  styleUrls: ["./synonyms-list.component.scss"],
})
export class SynonymsListComponent implements OnInit {
  @Select(SynonymsState.searchWord) searchWord$!: Observable<string>;
  @Select(SynonymsState.synonyms) synonyms$!: Observable<Array<string>>;
  @Select(SynonymsState.synonymsCount) synonymsCount$!: Observable<number>;
  synonymFormToggle = false;
  synonymFormControl!: FormControl;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  initSynonymFormControl(): void {
    this.synonymFormControl = new FormControl("", [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[A-Za-z]+$')
    ]);
  }

  addNewSynonym(): void {
    this.initSynonymFormControl();
    this.synonymFormToggle = true;
  }

  onSynonymCancel(): void {
    this.synonymFormToggle = false;
  }

  onSynonymSave(): void {
    this.store.dispatch(new AddSynonyms(this.synonymFormControl.value));
    this.synonymFormToggle = false;
  }

  onSynonymDelete(synonym: string): void {
    this.store.dispatch(new DeleteSynonym(synonym));
  }
}
