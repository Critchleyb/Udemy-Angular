import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm()
      }
    );
  }

  private initForm() {
    let loadedRecipe: Recipe;
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode){
      const loadedRecipe = this.recipeService.getRecipe(this.id);
      name = loadedRecipe.name;
      imagePath = loadedRecipe.imagePath;
      description = loadedRecipe.description;
      if(loadedRecipe['ingredients']) {
        for (let ingredient of loadedRecipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.editForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    })
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.editForm.value['name'],
    //   this.editForm.value['description'],
    //   this.editForm.value['imagePath'],
    //   this.editForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.editForm.value ,this.id);
      console.log("submit")
    } else {
      this.recipeService.addRecipe(this.editForm.value);
      console.log("submit")
    }
  }

  getIngredientControls() {
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }

  getIngredientControl(index) {
    return (<FormArray>this.editForm.get('ingredients')).controls[index];
  }

  onAddIngredient() {
    (<FormArray>this.editForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }

}
