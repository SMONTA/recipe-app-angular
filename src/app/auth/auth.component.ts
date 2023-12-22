import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  authService = inject(AuthService);
  isLoginMode = true;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      // this.authService.signIn(email, password).subscribe({
      //   next: (respData) => {
      //     console.log(respData);
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   },
      // });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (respData) => {
          console.log(respData);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
