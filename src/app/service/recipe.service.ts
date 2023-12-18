import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../entities/recipe.model";
import { Ingredient } from "../entities/ingredient.model";
import { Subject } from "rxjs";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";

// @Injectable({
//   providedIn: "root",
// })
export class RecipeService {
  recipeChangedSubject = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe(
    //   "A Test Recipe",
    //   "This is a sample description",
    //   "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg",
    //   [new Ingredient("AAAA", 1), new Ingredient("BBB", 2)]
    // ),
    // new Recipe(
    //   "A Test Recipe 2",
    //   "This is a sample description 2",
    //   "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg",
    //   [new Ingredient("CCCCC", 1), new Ingredient("DDDD", 2)]
    // ),
  ];

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChangedSubject.next(this.getRecipes());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.at(index);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChangedSubject.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChangedSubject.next(this.getRecipes());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChangedSubject.next(this.getRecipes());
  }
}
