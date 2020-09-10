import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingedients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingedients));
  }

  getRecipe(recipeID: number){
    return this.recipes[recipeID];
  }

  addRecipe(recipeToAdd: Recipe) {
    this.recipes.push(recipeToAdd);
    this.pushRecipeUpdates();
  }

  updateRecipe(updatedRecipe: Recipe, indexToUpdate: number) {
    this.recipes[indexToUpdate] = updatedRecipe
    this.pushRecipeUpdates();
  }

  deleteRecipe(indexToDelete: number) {
    this.recipes.splice(indexToDelete,1);
    this.pushRecipeUpdates();
  }

  pushRecipeUpdates() {
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.pushRecipeUpdates();
  }
}
