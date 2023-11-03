import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../entities/ingredient.model";
import { ShoppingService } from "../service/shopping.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
  }
  // addIngredient(ingredient: Ingredient) {
  //   this.shoppingService.addIngredient(ingredient);
  // }
}
