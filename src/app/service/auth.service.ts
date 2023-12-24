import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponseData } from "../entities/auth-response-data.model";
import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  http = inject(HttpClient);
  API_KEY = "AIzaSyCTAysTqPc2xuoia2i0SzquwRUDLPXf0Qw";
  urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  urlSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.urlSignUp, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorResp) => {
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
              default:
                errorMessage = `An error occurred: ${errorResp.error.error.message}`;
                break;
            }
            return throwError(() => new Error(errorMessage));
          } else {
            return throwError(() => new Error(errorResp));
          }
        })
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
        catchError((errorResp) => {
          let message = "Unknown Error";

          if (
            errorResp.error &&
            errorResp.error.error &&
            errorResp.error.error.message
          ) {
            switch (errorResp.error.error.message) {
              case "EMAIL_NOT_FOUND":
                message =
                  "There is no user record corresponding to this identifier. The user may have been deleted.";
                break;
              case "INVALID_PASSWORD":
                message =
                  "The password is invalid or the user does not have a password.";
                break;
              case "USER_DISABLED":
                message =
                  "The user account has been disabled by an administrator.";
                break;
              default:
                message = `An error occurred: ${errorResp.error.error.message}`;
                break;
            }
            return throwError(() => new Error(message));
          } else {
            return throwError(() => new Error(errorResp));
          }
        })
      );
  }
}
