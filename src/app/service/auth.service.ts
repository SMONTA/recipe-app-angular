import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponseData } from "../entities/auth-response-data.model";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../entities/user.model";
import { TaggedTemplateExpr } from "@angular/compiler";
import { RouteConfigLoadEnd, Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  API_KEY = "AIzaSyCTAysTqPc2xuoia2i0SzquwRUDLPXf0Qw";
  urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  urlSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
  userSubject = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.urlSignUp, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorResp) => this.handleError(errorResp)),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.urlSignIn, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorResp) => this.handleError(errorResp)),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/login"]);
    if (!this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _expirationData: string;
    } = JSON.parse(localStorage.getItem("userData"));

    console.log("auto login stated !" + userData);

    console.log(userData);

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expirationData)
    );

    if (loadedUser.token) {
      const expirationDuration =
        new Date(userData._expirationData).getTime() - new Date().getTime();
      this.userSubject.next(loadedUser);
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logout(),
      expirationDuration
      // 2000 // test with 2 seconds
    );
  }

  private handleAuthentication(
    email: string,
    id: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, idToken, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = "Unknown Error";

    if (
      errorResp.error &&
      errorResp.error.error &&
      errorResp.error.error.message
    ) {
      switch (errorResp.error.error.message) {
        case "EMAIL_EXISTS":
          errorMessage =
            "The email address is already in use by another account";
          break;
        case "OPERATION_NOT_ALLOWED":
          errorMessage = "Password sign-up is disabled for this project.";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          errorMessage =
            "We have blocked all requests from this device due to unusual activity. Try again later.";
          break;
        case "EMAIL_NOT_FOUND":
          errorMessage =
            "There is no user record corresponding to this identifier. The user may have been deleted.";
          break;
        case "INVALID_PASSWORD":
          errorMessage =
            "The password is invalid or the user does not have a password.";
          break;
        case "USER_DISABLED":
          errorMessage =
            "The user account has been disabled by an administrator.";
          break;
        default:
          errorMessage = `An error occurred: ${errorResp.error.error.message}`;
          break;
      }
      return throwError(() => new Error(errorMessage));
    } else {
      return throwError(() => new Error(errorResp.message));
    }
  }
}
