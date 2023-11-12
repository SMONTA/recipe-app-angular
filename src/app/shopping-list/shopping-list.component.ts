import { Component, OnDestroy, OnInit } from "@angular/core";
import { Ingredient } from "../entities/ingredient.model";
import { ShoppingService } from "../service/shopping.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subscription: Subscription;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    );
  }
  // addIngredient(ingredient: Ingredient) {
  //   this.shoppingService.addIngredient(ingredient);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
