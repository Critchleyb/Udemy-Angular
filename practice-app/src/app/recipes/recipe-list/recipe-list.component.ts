import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeClicked = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Test Recipe','This is a test','https://www.seekpng.com/png/full/1011-10115301_pizza-slices-clipart-pizza-stickers.png'),
    new Recipe('Test Recipe2','This is a test2','https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeClicked(recipe: Recipe) {
    this.recipeClicked.emit(recipe);
  }

}
