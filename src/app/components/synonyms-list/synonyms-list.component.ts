import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  AddSynonyms,
  DeleteSynonym,
  UpdateSynonym,
} from "src/app/store/synonyms.actions";
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
  synonymForUpdate = "";
  synonymUpdateFormControl!: FormControl;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchWord$.subscribe(() => this.onSynonymCancel()); // Reset input form on search change
  }

  addNewSynonym(): void {
    // Initialize new synonym form control with validators and show it
    this.synonymFormControl = new FormControl("", [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("^[A-Za-z ]+$"),
    ]);
    this.synonymFormToggle = true;
  }

  onSynonymCancel(): void {
    // Reset new synonym form control and hide input
    this.synonymFormControl?.reset();
    this.synonymFormToggle = false;
  }

  onSynonymSave(): void {
    // Save new synonym and hide input
    this.store.dispatch(new AddSynonyms(this.synonymFormControl.value));
    this.synonymFormToggle = false;
  }

  onSynonymDelete(synonym: string): void {
    this.store.dispatch(new DeleteSynonym(synonym));
  }

  updateSynonym(synonym: string): void {
    // Initialize form control for updating synonym and show input
    this.synonymForUpdate = synonym;
    this.synonymUpdateFormControl = new FormControl(synonym, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("^[A-Za-z ]+$"),
    ]);
  }

  onCancelUpdate(): void {
    // Reset form control for updating synonym and hide input
    this.synonymUpdateFormControl?.reset();
    this.synonymForUpdate = "";
  }
  onSynonymUpdate(synonym: string): void {
    // Save updated synonym
    this.store.dispatch(
      new UpdateSynonym(synonym, this.synonymUpdateFormControl.value)
    );
    this.synonymForUpdate = "";
  }
}
