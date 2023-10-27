import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "recipe-app";

  selectedFeature: string = "recipe";

  onNavigation(feature) {
    this.selectedFeature = feature;
  }
}
