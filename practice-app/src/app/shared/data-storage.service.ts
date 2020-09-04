import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService implements OnInit {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-complete-guide-55348.firebaseio.com/recipes.json', recipes).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-complete-guide-55348.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
      });
    }),tap( recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }

}
