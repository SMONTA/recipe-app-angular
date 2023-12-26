import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
})
export class AlertComponent {
  @Input("errorMessage") message: string;
  @Output() close = new EventEmitter<void>();

  closeAlert() {
    this.close.emit();
  }
}
