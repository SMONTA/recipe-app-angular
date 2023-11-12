import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../entities/recipe.model";
import { Ingredient } from "../entities/ingredient.model";

// @Injectable({
//   providedIn: "root",
// })
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is a sample description",
      "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg",
      [new Ingredient("AAAA", 1), new Ingredient("BBB", 2)]
    ),
    new Recipe(
      "A Test Recipe 2",
      "This is a sample description 2",
      "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg",
      [new Ingredient("CCCCC", 1), new Ingredient("DDDD", 2)]
    ),
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.at(index);
  }
}
