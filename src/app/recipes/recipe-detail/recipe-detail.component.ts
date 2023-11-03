import { Component, Input } from "@angular/core";
import { Recipe } from "src/app/entities/recipe.model";
import { ShoppingService } from "src/app/service/shopping.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingService: ShoppingService) {}

  onToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }
}
