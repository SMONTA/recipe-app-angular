import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../../entities/recipe.model";
import { RecipeService } from "src/app/service/recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  @Output() selectedRecipeParent = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelector(recipe) {
    this.selectedRecipeParent.emit(recipe);
    // console.log("this.selectedRecipeParent.emit(recipe);" + recipe);
  }
}
