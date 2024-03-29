import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  BrowserAnimationsModule,
  provideAnimations,
} from "@angular/platform-browser/animations";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./entities/dropdown.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipeService } from "./service/recipe.service";
import { ShoppingService } from "./service/shopping.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthInterceptorService } from "./service/auth-interceptor.service";
import { AlertComponent } from "./shared/alert/alert.component";
import { NgComponentOutlet } from "@angular/common";
// import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingModule } from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgComponentOutlet,
    // RecipesModule,// loaded lazily
    ShoppingModule,
  ],
  providers: [
    ShoppingService,
    RecipeService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
