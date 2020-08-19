import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'This is a test',
      'https://www.seekpng.com/png/full/1011-10115301_pizza-slices-clipart-pizza-stickers.png',
      [
        new Ingredient('Cheese', 1),
        new Ingredient('Tomatoe',1)
      ]
    ),
    new Recipe(
      'Test Recipe2',
      'This is a test2',
      'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('Salad',1)
      ]
    )
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(recipeID: number){
    return this.recipes[recipeID];
  }

  addRecipe(recipeToAdd: Recipe) {

  }

  deleteRecipe(recipeToDelete: Recipe) {
    
  }
}
