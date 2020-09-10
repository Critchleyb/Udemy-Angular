import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ShoppingListService } from './shopping-list.service';

import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (newIngredients: Ingredient[]) => {
    //     this.ingredients = newIngredients;
    //   }
    // )
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onClick(index: number){
    // this.shoppingListService.selectIngredient(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
