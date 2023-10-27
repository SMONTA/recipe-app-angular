import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() selectorEmitter = new EventEmitter<string>();
  ngOnInit(): void {}

  selectRecipe() {
    this.selectorEmitter.emit("recipe");
  }

  selectShopping() {
    this.selectorEmitter.emit("shopping");
  }
}
