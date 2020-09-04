import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
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
