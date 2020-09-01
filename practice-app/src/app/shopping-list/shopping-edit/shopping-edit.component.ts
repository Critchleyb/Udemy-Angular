import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') SlForm: NgForm;

  selectedIngredientIndex: number;
  selectedIngredient: Ingredient;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.selectedIngredient.subscribe((index) => {
      this.selectedIngredientIndex = index;
      this.selectedIngredient = this.shoppingListService.getIngredient(index);
      this.SlForm.setValue({name: this.selectedIngredient.name, amount: this.selectedIngredient.amount})
      this.editMode = true;
    })
  }

  onSubmit(form: NgForm) {
    if(!this.editMode){
      this.shoppingListService.addIngredient(new Ingredient(form.value.name,form.value.amount));
      form.reset();
    } else {
      this.shoppingListService.updateIngredient(new Ingredient(form.value.name,form.value.amount), this.selectedIngredientIndex);
      this.resetState();
    }
  }

  resetState() {
    this.selectedIngredient = null;
    this.editMode = false;
    this.SlForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);
    this.resetState();
  }
}
