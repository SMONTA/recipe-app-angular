import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { DataStorageService } from "./data-storage.service";
import { Recipe } from "../entities/recipe.model";
import { RecipeService } from "./recipe.service";

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const recipes = inject(RecipeService).getRecipes();
  if (recipes.length === 0) {
    return inject(DataStorageService).fetchRecipes();
  }
  return recipes;
};
