import {
  Component,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { trigger } from "@angular/animations";
import { Observable, Subscribable, Subscription } from "rxjs";
import { AuthResponseData } from "../entities/auth-response-data.model";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild("container", { read: ViewContainerRef, static: true })
  vcRef: ViewContainerRef;
  alertSub: Subscription;
  ngOnInit(): void {
    console.log("this.container element: ");
    console.log(this.vcRef);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    let authSub: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      authSub = this.authService.signIn(email, password);
    } else {
      authSub = this.authService.signUp(email, password);
    }

    authSub.subscribe({
      next: (respData) => {
        console.log(respData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.showAlertMessage(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
      },
    });

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  showAlertMessage(message: string) {
    this.vcRef.clear();
    const alterComponent = this.vcRef.createComponent(AlertComponent);
    alterComponent.setInput("errorMessage", message);
    this.alertSub = alterComponent.instance.close.subscribe((event) => {
      this.onHandleError();
      this.vcRef.clear();
    });
  }

  ngOnDestroy(): void {
    this.alertSub.unsubscribe();
  }
}
