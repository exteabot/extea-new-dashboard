import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { NFCManagementComponent } from "../../../shared/components/active_tables/nfc_details/nfc_details.component";

@Component({
  selector: "app-nfc-details",
  standalone: true,
  imports: [CommonModule, PageBreadcrumbComponent, NFCManagementComponent],
  templateUrl: "./nfc_details.component.html",
  styles: ``,
})
export class NFCDetails {}
