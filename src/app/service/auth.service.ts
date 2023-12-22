import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponseData } from "../entities/auth-response-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  http = inject(HttpClient);
  url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTAysTqPc2xuoia2i0SzquwRUDLPXf0Qw";

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
