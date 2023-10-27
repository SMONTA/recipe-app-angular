import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Recipe } from "src/app/entities/recipe.model";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  @Output() recipeEmitterChild = new EventEmitter<void>();

  onSelectRecipe() {
    this.recipeEmitterChild.emit();
    // console.log("this.recipeEmitterChild.emit(); event fired");
  }
}
