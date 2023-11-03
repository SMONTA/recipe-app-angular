import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../entities/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Appels", 5),
    new Ingredient("Tomatoes", 6),
  ];

  constructor() {}

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    console.log("Function called: " + ingredients);
    // This solution works but it emits unnecessary events so we can use ES6 feature ...e=ingredients
    // ingredients.forEach((ingredient) => this.addIngredient(ingredient));
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
