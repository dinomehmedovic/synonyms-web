import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { SynonymsApiService } from '../services/synonyms-api.service';
import { GetSynonyms } from './synonyms.actions';

export interface SynonymsStateModel {
  synonyms: Array<string> | null;
  loading: boolean;
  error: any;
}

const defaultState: SynonymsStateModel = {
  synonyms: null,
  loading: false,
  error: null,
};

@Injectable()
@State<SynonymsStateModel>({
    name: 'synonyms',
    defaults: defaultState
  })
export class SynonymsState {
    @Selector()
    static synonyms(state: SynonymsStateModel): Array<string> | null {
      return state.synonyms;
    }
    constructor(private synonymsApiService: SynonymsApiService) {}

    @Action(GetSynonyms)
    getSynonyms(ctx: StateContext<SynonymsStateModel>, action: GetSynonyms): void {
      console.log('Searching: ', action.synonym);
      ctx.patchState({ loading: true });
      this.synonymsApiService.getSynonyms(action.synonym).pipe(
        tap((result) => {
          console.log('Result: ', result);
          ctx.patchState({ loading: false, synonyms: result.synonyms });
        }),
        catchError(error => this.handleError(ctx, error))
      ).subscribe();
    }
  
    private handleError(ctx: StateContext<SynonymsStateModel>, err: any): any {
      ctx.patchState({ error: err, loading: false });
      return throwError(() => err);
    }
}