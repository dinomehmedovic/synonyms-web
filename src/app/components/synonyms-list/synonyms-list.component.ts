import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AddSynonyms, DeleteSynonym, UpdateSynonym } from "src/app/store/synonyms.actions";
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
  synonymForUpdate = '';
  synonymUpdateFormControl!: FormControl;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchWord$.subscribe(() => this.onSynonymCancel()); // Reset input form on search change
  }

  initSynonymFormControl(): void {
    this.synonymFormControl = new FormControl("", [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("^[A-Za-z ]+$"),
    ]);
  }

  addNewSynonym(): void {
    this.initSynonymFormControl();
    this.synonymFormToggle = true;
  }

  onSynonymCancel(): void {
    this.synonymFormControl?.reset();
    this.synonymFormToggle = false;
  }

  onSynonymSave(): void {
    this.store.dispatch(new AddSynonyms(this.synonymFormControl.value));
    this.synonymFormToggle = false;
  }

  onSynonymDelete(synonym: string): void {
    this.store.dispatch(new DeleteSynonym(synonym));
  }

  updateSynonym(synonym: string): void {
    this.synonymForUpdate = synonym;
    this.synonymUpdateFormControl = new FormControl(synonym, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("^[A-Za-z ]+$"),
    ]);
  }

  onCancelUpdate(): void {
    this.synonymUpdateFormControl?.reset();
    this.synonymForUpdate = '';
  }
  onSynonymUpdate(synonym: string): void {
    this.store.dispatch(new UpdateSynonym(synonym, this.synonymUpdateFormControl.value));
    this.synonymForUpdate = '';
  }
}
