import { NgFor } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
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

  onAddIngredient(form: NgForm) {
    const value = form.value;
    console.log(form.value);

    this.shoppingService.addIngredient(
      new Ingredient(value.name, parseInt(value.amount))
    );
  }
}
