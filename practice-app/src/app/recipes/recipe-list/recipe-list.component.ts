import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test Recipe','This is a test','https://www.seekpng.com/png/full/1011-10115301_pizza-slices-clipart-pizza-stickers.png')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
