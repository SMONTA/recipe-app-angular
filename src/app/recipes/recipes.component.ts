import { Component, OnInit } from "@angular/core";
import { Recipe } from "../entities/recipe.model";
import { RecipeService } from "../service/recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}
}
