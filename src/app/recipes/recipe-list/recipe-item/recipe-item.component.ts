import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Recipe } from "src/app/entities/recipe.model";
import { RecipeService } from "src/app/service/recipe.service";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;
}
