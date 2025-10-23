import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../../ui/button/button.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { SelectComponent, Option } from "../../form/select/select.component";
import { TableDropdownComponent } from "../../common/table-dropdown/table-dropdown.component";
import { BadgeComponent } from "../../ui/badge/badge.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { PageBreadcrumbComponent } from "../../common/page-breadcrumb/page-breadcrumb.component";
import {
  ReportService,
  ReportColumn,
  ReportConfig,
} from "../../../services/report.service";
import { ReportViewerComponent } from "../../reports/report.component";

interface NFCCard {
  listId: number;
  nfcId: string;
  systemId: string;
  customerName: string;
  telephone: string;
  cardType: "Limited" | "Unlimited";
  isActive: boolean;
  balance: number;
  currency: string;
  addedDate: Date;
  customerAddress?: string;
  customerEmail?: string;
}

@Component({
  selector: "app-nfc-management-table",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputFieldComponent,
    SelectComponent,
    TableDropdownComponent,
    BadgeComponent,
    ModalComponent,
    PageBreadcrumbComponent,
    ReportViewerComponent, // Make sure this is imported
  ],
  templateUrl: "./nfc_details.component.html",
  styles: ``,
})
export class NFCManagementComponent {
  // Report properties - ADD THESE
  isReportOpen = false;

  // Filter form data
  filterForm = {
    nfcId: "",
    systemId: "",
    cardType: "" as "" | "Limited" | "Unlimited",
    status: "" as "" | "Active" | "Inactive",
  };

  // Sample data
  nfcCards: NFCCard[] = [
    {
      listId: 1,
      nfcId: "NFC001",
      systemId: "SYS001",
      customerName: "John Doe",
      telephone: "+94123456789",
      cardType: "Limited",
      isActive: true,
      balance: 1500.5,
      currency: "LKR",
      addedDate: new Date("2024-01-15"),
      customerAddress: "123 Main Street, Colombo",
      customerEmail: "john.doe@email.com",
    },
    {
      listId: 2,
      nfcId: "NFC002",
      systemId: "SYS002",
      customerName: "Jane Smith",
      telephone: "+94123456780",
      cardType: "Unlimited",
      isActive: false,
      balance: 2500.75,
      currency: "USD",
      addedDate: new Date("2024-01-20"),
      customerAddress: "456 Oak Avenue, Kandy",
      customerEmail: "jane.smith@email.com",
    },
    {
      listId: 3,
      nfcId: "NFC003",
      systemId: "SYS003",
      customerName: "Bob Johnson",
      telephone: "+94123456781",
      cardType: "Limited",
      isActive: true,
      balance: 1800.25,
      currency: "EUR",
      addedDate: new Date("2024-02-01"),
      customerAddress: "789 Palm Road, Galle",
      customerEmail: "bob.johnson@email.com",
    },
    {
      listId: 4,
      nfcId: "NFC004",
      systemId: "SYS004",
      customerName: "Alice Brown",
      telephone: "+94123456782",
      cardType: "Unlimited",
      isActive: true,
      balance: 3200.0,
      currency: "LKR",
      addedDate: new Date("2024-02-05"),
      customerAddress: "321 Beach Street, Negombo",
      customerEmail: "alice.brown@email.com",
    },
    {
      listId: 5,
      nfcId: "NFC005",
      systemId: "SYS005",
      customerName: "Charlie Wilson",
      telephone: "+94123456783",
      cardType: "Limited",
      isActive: false,
      balance: 950.8,
      currency: "GBP",
      addedDate: new Date("2024-02-10"),
      customerAddress: "654 Hill Lane, Jaffna",
      customerEmail: "charlie.wilson@email.com",
    },
  ];

  // Filtered data
  filteredCards: NFCCard[] = [...this.nfcCards];

  // Edit modal
  isEditModalOpen = false;
  editingCard: NFCCard | null = null;
  editForm = {
    customerName: "",
    customerAddress: "",
    customerMobile: "",
    customerEmail: "",
    cardType: "" as "Limited" | "Unlimited",
    balance: 0,
    currency: "LKR",
  };

  // Dropdown options
  cardTypeOptions: Option[] = [
    { value: "", label: "All Types" },
    { value: "Limited", label: "Limited" },
    { value: "Unlimited", label: "Unlimited" },
  ];

  statusOptions: Option[] = [
    { value: "", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  currencyOptions: Option[] = [
    { value: "LKR", label: "LKR - Sri Lankan Rupee" },
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "JPY", label: "JPY - Japanese Yen" },
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private reportService: ReportService) {}

  get totalPages(): number {
    return Math.ceil(this.filteredCards.length / this.itemsPerPage);
  }

  get currentItems(): NFCCard[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCards.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Filter functionality
  applyFilters() {
    this.filteredCards = this.nfcCards.filter((card) => {
      const matchesNfcId =
        !this.filterForm.nfcId ||
        card.nfcId.toLowerCase().includes(this.filterForm.nfcId.toLowerCase());

      const matchesSystemId =
        !this.filterForm.systemId ||
        card.systemId
          .toLowerCase()
          .includes(this.filterForm.systemId.toLowerCase());

      const matchesCardType =
        !this.filterForm.cardType || card.cardType === this.filterForm.cardType;

      const matchesStatus =
        !this.filterForm.status ||
        (this.filterForm.status === "Active" && card.isActive) ||
        (this.filterForm.status === "Inactive" && !card.isActive);

      return (
        matchesNfcId && matchesSystemId && matchesCardType && matchesStatus
      );
    });

    this.currentPage = 1; // Reset to first page after filtering
  }

  clearFilters() {
    this.filterForm = {
      nfcId: "",
      systemId: "",
      cardType: "",
      status: "",
    };
    this.filteredCards = [...this.nfcCards];
    this.currentPage = 1;
  }

  // Status toggle
  toggleStatus(card: NFCCard) {
    card.isActive = !card.isActive;
    this.applyFilters(); // Reapply filters to update display
  }

  // Edit functionality
  openEditModal(card: NFCCard) {
    this.editingCard = { ...card };
    this.editForm = {
      customerName: card.customerName,
      customerAddress: card.customerAddress || "",
      customerMobile: card.telephone,
      customerEmail: card.customerEmail || "",
      cardType: card.cardType,
      balance: card.balance,
      currency: card.currency,
    };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingCard = null;
  }

  // Update the submitEdit method
  submitEdit() {
    if (this.editingCard && this.isFormValid()) {
      // Update the card with edited data
      this.editingCard.customerName = this.editForm.customerName;
      this.editingCard.customerAddress = this.editForm.customerAddress;
      this.editingCard.telephone = this.editForm.customerMobile;
      this.editingCard.customerEmail = this.editForm.customerEmail;
      this.editingCard.cardType = this.editForm.cardType;
      this.editingCard.balance = Number(this.editForm.balance);
      this.editingCard.currency = this.editForm.currency;

      // Update the original card in the array
      const originalCardIndex = this.nfcCards.findIndex(
        (card) => card.listId === this.editingCard!.listId
      );
      if (originalCardIndex !== -1) {
        this.nfcCards[originalCardIndex] = { ...this.editingCard };
      }

      this.applyFilters();
      this.closeEditModal();
    }
  }

  // Add form validation method
  private isFormValid(): boolean {
    return (
      !!this.editForm.customerName &&
      !!this.editForm.customerMobile &&
      !!this.editForm.cardType &&
      this.editForm.balance >= 0
    );
  }

  // REPORT FUNCTIONALITY - ADD THESE METHODS
  generateReport(): void {
    const reportColumns: ReportColumn[] = [
      { key: "listId", label: "List ID", type: "text" },
      { key: "nfcId", label: "NFC ID", type: "text" },
      { key: "systemId", label: "System ID", type: "text" },
      { key: "customerName", label: "Customer Name", type: "text" },
      { key: "telephone", label: "Telephone", type: "text" },
      {
        key: "cardType",
        label: "Card Type",
        type: "badge",
        format: (value: string) => value,
      },
      {
        key: "isActive",
        label: "Status",
        type: "status",
        format: (value: boolean) => (value ? "Active" : "Inactive"),
      },
      {
        key: "balance",
        label: "Balance",
        type: "number",
        // FIXED: Only use one parameter and get currency from the value itself
        format: (value: any) => {
          // Since we can't pass the item, we need to handle this differently
          // For now, we'll assume the value contains both balance and currency
          // or we'll need to modify the ReportColumn interface
          if (typeof value === "object" && value.balance && value.currency) {
            return this.formatCurrency(value.balance, value.currency);
          }
          // Fallback: just format as number
          return `$${Number(value).toFixed(2)}`;
        },
      },
      {
        key: "addedDate",
        label: "Added Date",
        type: "text",
        format: (value: Date) => this.formatDate(value),
      },
    ];

    // Prepare items for the report - combine balance and currency for the format function
    const reportItems = this.filteredCards.map((card) => ({
      ...card,
      // Create a combined field for balance that includes currency info
      balanceWithCurrency: { balance: card.balance, currency: card.currency },
    }));

    // Update the balance column to use the combined field
    const updatedColumns = reportColumns.map((col) => {
      if (col.key === "balance") {
        return {
          ...col,
          key: "balanceWithCurrency", // Use the combined field
        };
      }
      return col;
    });

    // Calculate summary statistics
    const activeCount = this.filteredCards.filter(
      (card) => card.isActive
    ).length;
    const inactiveCount = this.filteredCards.filter(
      (card) => !card.isActive
    ).length;
    const limitedCount = this.filteredCards.filter(
      (card) => card.cardType === "Limited"
    ).length;
    const unlimitedCount = this.filteredCards.filter(
      (card) => card.cardType === "Unlimited"
    ).length;

    // Calculate total balance by currency
    const balanceByCurrency = this.filteredCards.reduce((acc, card) => {
      if (!acc[card.currency]) {
        acc[card.currency] = 0;
      }
      acc[card.currency] += card.balance;
      return acc;
    }, {} as { [key: string]: number });

    const balanceSummary = Object.entries(balanceByCurrency)
      .map(([currency, amount]) => `${this.formatCurrency(amount, currency)}`)
      .join(", ");

    const reportConfig: ReportConfig = {
      title: "NFC Cards Management Report",
      filters: {
        nfcId: this.filterForm.nfcId || "All",
        systemId: this.filterForm.systemId || "All",
        cardType: this.filterForm.cardType || "All Types",
        status: this.filterForm.status || "All Status",
      },
      items: reportItems, // Use the modified items
      columns: updatedColumns, // Use the updated columns
      summary: {
        totalCards: this.filteredCards.length,
        activeCards: activeCount,
        inactiveCards: inactiveCount,
        limitedCards: limitedCount,
        unlimitedCards: unlimitedCount,
        totalBalance: balanceSummary || "No balance data",
      },
    };

    this.reportService.generateReport(reportConfig);
    this.isReportOpen = true;
  }

  closeReport(): void {
    this.isReportOpen = false;
    this.reportService.clearReport();
  }

  getBadgeColor(status: boolean): "success" | "error" | "warning" {
    return status ? "success" : "error";
  }

  getCardTypeColor(type: string): "primary" | "success" | "warning" | "info" {
    if (type === "Limited") return "warning";
    if (type === "Unlimited") return "success";
    return "primary"; // fallback to primary
  }

  formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }
}
