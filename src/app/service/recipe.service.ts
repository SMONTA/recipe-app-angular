import { Injectable } from "@angular/core";
import { Recipe } from "../entities/recipe.model";

// @Injectable({
//   providedIn: "root",
// })
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is a sample description",
      "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg"
    ),
    new Recipe(
      "A Test Recipe 2",
      "This is a sample description 2",
      "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg"
    ),
  ];
  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
