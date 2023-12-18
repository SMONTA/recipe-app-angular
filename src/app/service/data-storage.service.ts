import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, inject } from "@angular/core";
import { Recipe } from "../entities/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  private URL =
    "https://ng-course-recipe-29586-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
  private http = inject(HttpClient);

  constructor(private recipeService: RecipeService) {}

  storeRecipes() {
    let recipes = this.recipeService.getRecipes();
    this.http.put(this.URL, recipes).subscribe((resp) => {
      console.log(resp);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.URL).subscribe((resp) => {
      this.recipeService.setRecipes(resp);
      console.log(resp);
    });
  }
}
