import { Component, EventEmitter, Output } from "@angular/core";
import { Ingredient } from "src/app/entities/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent {
  @Output() addIngredientEmitter = new EventEmitter<Ingredient>();

  onAddIngredient(nameInput: HTMLInputElement, amountInout: HTMLInputElement) {
    this.addIngredientEmitter.emit(
      new Ingredient(nameInput.value, parseInt(amountInout.value))
    );
  }
}
