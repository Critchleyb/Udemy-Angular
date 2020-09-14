import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const inititalState: State = {
    recipes: []
}

export function recipeRecuder(state, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipe = { 
                ...state.recipes[action.payload.index], 
                ...action.payload.recipe
            }
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            }
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((el, index) => {
                    return index !== action.payload;
                })
            }
        default:
            return state;
    }
}