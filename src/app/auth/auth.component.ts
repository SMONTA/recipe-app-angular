import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { trigger } from "@angular/animations";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  authService = inject(AuthService);
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.authService.signIn(email, password).subscribe({
        next: (respData) => {
          console.log(respData);
          this.isLoading = false;
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.isLoading = false;
          this.error = errorMessage;
        },
      });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (respData) => {
          console.log(respData);
          this.isLoading = false;
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.isLoading = false;
          this.error = errorMessage;
        },
      });
    }

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleError() {
    this.error = null;
  }
}
