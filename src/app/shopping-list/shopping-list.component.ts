import { Component } from '@angular/core';
import { Ingredient } from '../entities/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Appels', 5),
    new Ingredient('Tomatoes', 6),
  ];
}
