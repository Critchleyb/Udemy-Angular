import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') SlForm: NgForm;

  // selectedIngredientIndex: number;
  selectedIngredient: Ingredient;
  editMode = false;
  private subscription: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.selectedIngredient = stateData.editedIngredient;
        this.SlForm.setValue({name: this.selectedIngredient.name, amount: this.selectedIngredient.amount})
      } else {
        this.editMode = false;
      }
    });
    // this.shoppingListService.selectedIngredient.subscribe((index) => {
    //   this.selectedIngredientIndex = index;
    //   this.selectedIngredient = this.shoppingListService.getIngredient(index);
    //   this.SlForm.setValue({name: this.selectedIngredient.name, amount: this.selectedIngredient.amount})
    //   this.editMode = true;
    // })
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit())
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if(!this.editMode){
      // this.shoppingListService.addIngredient(new Ingredient(form.value.name,form.value.amount));
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(form.value.name,form.value.amount)));
      form.reset();
    } else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredient(form.value.name,form.value.amount)));
      // this.shoppingListService.updateIngredient(new Ingredient(form.value.name,form.value.amount), this.selectedIngredientIndex);
      this.resetState();
    }
  }

  resetState() {
    this.selectedIngredient = null;
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.SlForm.reset();
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.resetState();
  }
}
