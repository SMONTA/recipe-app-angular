import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Recipe } from "src/app/entities/recipe.model";
import { RecipeService } from "src/app/service/recipe.service";
import { ShoppingService } from "src/app/service/shopping.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  onAddToShoppingList() {
    console.log("ingredients to add to list: " + this.recipe.ingredients);
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
