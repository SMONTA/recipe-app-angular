import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, inject } from "@angular/core";
import { Recipe } from "../entities/recipe.model";
import { RecipeService } from "./recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  private URL = environment.firebaseUrl;
  private http = inject(HttpClient);

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    let recipes = this.recipeService.getRecipes();
    this.http.put(this.URL, recipes).subscribe((resp) => {
      console.log(resp);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.URL).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }
}
