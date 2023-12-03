import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "src/app/service/recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }

  onRecipeSubmit() {
    console.log(this.recipeForm);
  }

  onClear() {
    this.recipeForm.reset();
  }

  onDelete() {}

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = this.fb.array<
      FormGroup<{ name: FormControl<string>; amount: FormControl<number> }>
    >([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        recipe.ingredients.forEach((ingredient) => {
          let ingredientCtl = this.fb.group({
            name: [ingredient.name],
            amount: [ingredient.amount],
          });
          recipeIngredients.push(ingredientCtl);
        });
      }
    }
    this.recipeForm = this.fb.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients,
    });
  }

  public get ingredientsControl(): FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  removeIngredient() {}

  addIngredient() {
    this.ingredientsControl.push(
      this.fb.group({
        name: [],
        amount: [],
      })
    );
  }
}
