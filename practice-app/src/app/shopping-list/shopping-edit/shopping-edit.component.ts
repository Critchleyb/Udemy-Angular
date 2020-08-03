import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onClickAdd() {
    const name = this.nameInputRef.nativeElement.value;
    const value = this.amountInputRef.nativeElement.value;

    if(name && value){
      const newIngredient = new Ingredient(name, value);
      this.nameInputRef.nativeElement.value = '';
      this.amountInputRef.nativeElement.value = '';
      this.shoppingListService.addIngredient(newIngredient);
    }
    else{
      alert('Enter a Name and Amount');
    }
  }
}
