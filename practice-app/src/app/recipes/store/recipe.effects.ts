import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import { Injectable } from '@angular/core';


@Injectable()
export class RecipeEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-complete-guide-55348.firebaseio.com/recipes.json'
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return new RecipeActions.SetRecipes(recipes);
      })
    );
}