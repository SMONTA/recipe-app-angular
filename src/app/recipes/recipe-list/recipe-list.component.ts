import { Component, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "../../entities/recipe.model";
import { RecipeService } from "src/app/service/recipe.service";
import { subscriptionLogsToBeFn } from "rxjs/internal/testing/TestScheduler";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipeChangedSubject.subscribe(
      (value) => {
        this.recipes = value;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
