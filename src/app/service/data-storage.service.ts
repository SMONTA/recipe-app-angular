import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable, inject } from "@angular/core";
import { Recipe } from "../entities/recipe.model";
import { RecipeService } from "./recipe.service";
import { map, tap } from "rxjs/operators";

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
    return this.http
      .get<Recipe[]>(this.URL, {
        headers: new HttpHeaders({ auth: "dummy_auth" }),
      })
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .pipe(tap((recipes) => this.recipeService.setRecipes(recipes)));
  }
}
