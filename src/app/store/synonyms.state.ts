import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap, throwError } from "rxjs";
import { SynonymsApiService } from "../services/synonyms-api.service";
import { AddSynonyms, DeleteSynonym, GetSynonyms } from "./synonyms.actions";

export interface SynonymsStateModel {
  searchWord: string;
  synonyms: Array<string>;
  loading: boolean;
  error: any;
}

const defaultState: SynonymsStateModel = {
  searchWord: "",
  synonyms: [],
  loading: false,
  error: null,
};

@Injectable()
@State<SynonymsStateModel>({
  name: "synonyms",
  defaults: defaultState,
})
export class SynonymsState {
  @Selector()
  static searchWord(state: SynonymsStateModel): string {
    return state.searchWord;
  }

  @Selector()
  static synonyms(state: SynonymsStateModel): Array<string> {
    return state.synonyms;
  }

  @Selector()
  static synonymsCount(state: SynonymsStateModel): number {
    return state.synonyms.length;
  }
  constructor(private synonymsApiService: SynonymsApiService) {}

  @Action(GetSynonyms)
  getSynonyms(
    ctx: StateContext<SynonymsStateModel>,
    action: GetSynonyms
  ): void {
    console.log("Searching: ", action.synonym);
    if (action.synonym) {
      ctx.patchState({ loading: true });
      this.synonymsApiService
        .getSynonyms(action.synonym)
        .pipe(
          tap((result) => {
            console.log("Result: ", result);
            ctx.patchState({
              loading: false,
              searchWord: action.synonym,
              synonyms: result.synonyms,
            });
          }),
          catchError((error) => this.handleError(ctx, error))
        )
        .subscribe();
    } else {
      ctx.patchState({ loading: false, searchWord: "", synonyms: [] });
    }
  }

  @Action(AddSynonyms)
  addSynonyms(
    ctx: StateContext<SynonymsStateModel>,
    action: AddSynonyms
  ): void {
    ctx.patchState({ loading: true });
    this.synonymsApiService
      .addSynonyms(ctx.getState().searchWord, { synonyms: [action.newSynonym] })
      .pipe(
        tap((result) => {
          console.log("Result: ", result);
          ctx.patchState({ loading: false, synonyms: result.synonyms });
        }),
        catchError((error) => this.handleError(ctx, error))
      )
      .subscribe();
  }

  @Action(DeleteSynonym)
  deleteSynonym(
    ctx: StateContext<SynonymsStateModel>,
    action: DeleteSynonym
  ): void {
    ctx.patchState({ loading: true });
    this.synonymsApiService
      .deleteSynonym(action.synonym)
      .pipe(
        tap((result) => {
          console.log("Result: ", result);
          ctx.patchState({ loading: false });
          ctx.dispatch(new GetSynonyms(ctx.getState().searchWord));
        }),
        catchError((error) => this.handleError(ctx, error))
      )
      .subscribe();
  }

  private handleError(ctx: StateContext<SynonymsStateModel>, err: any): any {
    ctx.patchState({ error: err, loading: false });
    return throwError(() => err);
  }
}
