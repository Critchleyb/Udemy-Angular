import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipe.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeClicked = new EventEmitter<Recipe>();
  recipes: Recipe[];


  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeClicked(recipe: Recipe) {
    this.recipeClicked.emit(recipe);
  }

}
