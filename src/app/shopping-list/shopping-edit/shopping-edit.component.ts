import { Component, EventEmitter, Output } from "@angular/core";
import { Ingredient } from "src/app/entities/ingredient.model";
import { ShoppingService } from "src/app/service/shopping.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent {
  // @Output() addIngredientEmitter = new EventEmitter<Ingredient>();

  constructor(private shoppingService: ShoppingService) {}

  onAddIngredient(nameInput: HTMLInputElement, amountInout: HTMLInputElement) {
    this.shoppingService.addIngredient(
      new Ingredient(nameInput.value, parseInt(amountInout.value))
    );
  }
}
