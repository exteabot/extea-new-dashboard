import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { NfcBalanceTopupComponent } from "../../../shared/components/active_forms/nfc_topup_balance/nfc_topup_balance.component";

@Component({
  selector: "app-nfc-balance-topup",
  standalone: true,
  imports: [CommonModule, PageBreadcrumbComponent, NfcBalanceTopupComponent],
  templateUrl: "./balance_topup.component.html",
  styles: ``,
})
export class NFCTopUp {}
