import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
// import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  editForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
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

  ngOnDestroy() {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let loadedRecipe: Recipe;
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode){
      // const loadedRecipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipe').pipe(map(recipeState => recipeState.recipes[this.id]))
      .subscribe(loadedRecipe => {
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
      });

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
      // this.recipeService.updateRecipe(this.editForm.value ,this.id);
      this.store.dispatch(new RecipeActions.UpdateRecipe({recipe: this.editForm.value, index: this.id}));
    } else {
      // this.recipeService.addRecipe(this.editForm.value);
      this.store.dispatch(new RecipeActions.AddRecipe(this.editForm.value));
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
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
