import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { NewNfcFormComponent } from "../../../shared/components/active_forms/new_nfc_register/new_nfc_register.component";

@Component({
  selector: "app-new-nfc",
  standalone: true,
  imports: [CommonModule, PageBreadcrumbComponent, NewNfcFormComponent],
  templateUrl: "./new_nfc.component.html",
  styles: ``,
})
export class NewNFC {}
