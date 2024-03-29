import { NgFor } from "@angular/common";
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscribable, Subscription } from "rxjs";
import { Ingredient } from "src/app/entities/ingredient.model";
import { ShoppingService } from "src/app/service/shopping.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() addIngredientEmitter = new EventEmitter<Ingredient>();
  @ViewChild("f", { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number = -1;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue(this.editedItem);
      }
    );
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    console.log(form.value);
    const ingredient = new Ingredient(value.name, parseInt(value.amount));
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editItemIndex, ingredient);
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
    // this.slForm.setValue({ name: "", amount: 0 });
    // this.slForm.reset();
    this.onClear();
  }

  onClear() {
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
