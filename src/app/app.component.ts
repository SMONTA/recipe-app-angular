import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "./service/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "recipe-app";
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
