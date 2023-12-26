import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { recipesResolver } from "./service/recipes.resolver";
import { AuthComponent } from "./auth/auth.component";
import { authGuard } from "./service/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [recipesResolver],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [recipesResolver],
      },
    ],
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "login", component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
