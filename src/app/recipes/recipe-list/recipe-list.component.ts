import { Component, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../../entities/recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
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
  @Output() selectedRecipeParent = new EventEmitter<Recipe>();

  onRecipeSelector(recipe) {
    this.selectedRecipeParent.emit(recipe);
    // console.log("this.selectedRecipeParent.emit(recipe);" + recipe);
  }
}
