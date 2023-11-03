import { Injectable } from "@angular/core";
import { Ingredient } from "../entities/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient("Appels", 5),
    new Ingredient("Tomatoes", 6),
  ];

  constructor() {}

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
