// import { Ingredient } from '../shared/ingredient.model';
// import { Subject } from 'rxjs';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

// export class ShoppingListService {
//   ingredientsChanged = new Subject<Ingredient[]>();
//   private ingredients: Ingredient[] = [
//     new Ingredient('Apples',5),
//     new Ingredient('Tomatoes', 5)
//   ];
//   selectedIngredient = new Subject<number>();

//   constructor() { }

//   getIngredients() {
//     return this.ingredients.slice();
//   }

//   getIngredient(index: number) {
//     return this.ingredients[index];
//   }

//   updateIngredient(ingredient: Ingredient, index: number){
//     this.ingredients[index] = ingredient;
//     this.pushUpdates();
//   }

//   addIngredient(newIngredient: Ingredient) {
//     this.ingredients.push(newIngredient);
//     this.pushUpdates();
//   }

//   addIngredients(newIngredients: Ingredient[]) {
//     this.ingredients.push(...newIngredients);
//     this.pushUpdates();
//   }

//   selectIngredient(index: number){
//     this.selectedIngredient.next(index);
//   }

//   deleteIngredient(index: number){
//     this.ingredients.splice(index, 1);
//     this.pushUpdates();
//   }

//   pushUpdates() {
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }
// }
