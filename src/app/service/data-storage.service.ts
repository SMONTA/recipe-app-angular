import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, inject } from "@angular/core";
import { Recipe } from "../entities/recipe.model";
import { RecipeService } from "./recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  private URL =
    "https://ng-course-recipe-29586-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
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
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap((user) => {
        console.log("User logged in: ");
        console.log(user.token);
        return this.http.get<Recipe[]>(this.URL, {
          params: new HttpParams().set("auth", user.token),
        });
      }),
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
