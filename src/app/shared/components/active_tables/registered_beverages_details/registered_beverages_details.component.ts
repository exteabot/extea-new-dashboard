import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../../ui/button/button.component";
import { TableDropdownComponent } from "../../common/table-dropdown/table-dropdown.component";
import { BadgeComponent } from "../../ui/badge/badge.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { SelectComponent, Option } from "../../form/select/select.component";
import {
  ReportService,
  ReportColumn,
  ReportConfig,
} from "../../../services/report.service";
import { ReportViewerComponent } from "../../reports/report.component";

interface Beverage {
  id: string;
  beverageName: string;
  shortCode: string;
  description: string;
  activeStatus: "Active" | "Inactive";
  image: string;
  addedDate: string;
  unitPrice: number;
  costPrice: number;
}

@Component({
  selector: "app-registered-beverages-table",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
    ModalComponent,
    InputFieldComponent,
    SelectComponent,
    ReportViewerComponent,
  ],
  templateUrl: "./registered_beverages_details.component.html",
  styles: ``,
})
export class BeveragesTableComponent {
  // Report properties
  isReportOpen = false;

  // Filter form values
  filterForm = {
    beverageName: "",
    shortCode: "",
    activeStatus: "All",
  };

  // Status options
  activeStatusOptions: Option[] = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  // Original data
  originalBeverageData: Beverage[] = [
    {
      id: "B001",
      beverageName: "Classic Cola",
      shortCode: "COLA",
      description: "Refreshing carbonated cola drink",
      activeStatus: "Active",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=cola",
      addedDate: "2024-01-15",
      unitPrice: 2.5,
      costPrice: 1.2,
    },
    {
      id: "B002",
      beverageName: "Orange Fizz",
      shortCode: "ORNG",
      description: "Sparkling orange flavored beverage",
      activeStatus: "Active",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=orange",
      addedDate: "2024-01-20",
      unitPrice: 2.75,
      costPrice: 1.35,
    },
    {
      id: "B003",
      beverageName: "Lemon Lime",
      shortCode: "LEML",
      description: "Zesty lemon and lime carbonated drink",
      activeStatus: "Inactive",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=lemon",
      addedDate: "2024-02-01",
      unitPrice: 2.6,
      costPrice: 1.25,
    },
    {
      id: "B004",
      beverageName: "Grape Splash",
      shortCode: "GRPS",
      description: "Sweet grape flavored sparkling drink",
      activeStatus: "Active",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=grape",
      addedDate: "2024-02-10",
      unitPrice: 2.8,
      costPrice: 1.4,
    },
    {
      id: "B005",
      beverageName: "Root Beer",
      shortCode: "RTBR",
      description: "Classic root beer with creamy foam",
      activeStatus: "Active",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=rootbeer",
      addedDate: "2024-02-15",
      unitPrice: 2.9,
      costPrice: 1.45,
    },
    {
      id: "B006",
      beverageName: "Strawberry Burst",
      shortCode: "STRW",
      description: "Fresh strawberry flavored carbonated drink",
      activeStatus: "Inactive",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=strawberry",
      addedDate: "2024-03-01",
      unitPrice: 3.0,
      costPrice: 1.5,
    },
    {
      id: "B007",
      beverageName: "Pineapple Paradise",
      shortCode: "PINE",
      description: "Tropical pineapple flavored beverage",
      activeStatus: "Active",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=pineapple",
      addedDate: "2024-03-05",
      unitPrice: 2.95,
      costPrice: 1.48,
    },
    {
      id: "B008",
      beverageName: "Berry Blast",
      shortCode: "BERR",
      description: "Mixed berry carbonated drink",
      activeStatus: "Active",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=berry",
      addedDate: "2024-03-10",
      unitPrice: 3.1,
      costPrice: 1.55,
    },
    {
      id: "B009",
      beverageName: "Mango Tango",
      shortCode: "MANG",
      description: "Exotic mango flavored sparkling drink",
      activeStatus: "Inactive",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=mango",
      addedDate: "2024-03-12",
      unitPrice: 3.15,
      costPrice: 1.6,
    },
    {
      id: "B010",
      beverageName: "Vanilla Cream",
      shortCode: "VANL",
      description: "Creamy vanilla flavored soda",
      activeStatus: "Active",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=vanilla",
      addedDate: "2024-03-15",
      unitPrice: 3.25,
      costPrice: 1.65,
    },
  ];

  // Filtered data
  beverageData: Beverage[] = [...this.originalBeverageData];

  currentPage = 1;
  itemsPerPage = 5;

  // Modal properties
  isEditModalOpen = false;
  selectedBeverage: Beverage | null = null;
  editForm = {
    beverageName: "",
    shortCode: "",
    description: "",
    image: "",
    unitPrice: 0,
    costPrice: 0,
  };

  // Image upload properties
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isUploading = false;

  constructor(private reportService: ReportService) {}

  // Update methods for form inputs
  updateBeverageName(value: string | number) {
    this.filterForm.beverageName = value.toString();
  }

  updateShortCode(value: string | number) {
    this.filterForm.shortCode = value.toString();
  }

  get totalPages(): number {
    return Math.ceil(this.beverageData.length / this.itemsPerPage);
  }

  get currentItems(): Beverage[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.beverageData.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Apply filters
  applyFilters() {
    this.beverageData = this.originalBeverageData.filter((beverage) => {
      const matchesBeverageName =
        !this.filterForm.beverageName ||
        beverage.beverageName
          .toLowerCase()
          .includes(this.filterForm.beverageName.toLowerCase());

      const matchesShortCode =
        !this.filterForm.shortCode ||
        beverage.shortCode
          .toLowerCase()
          .includes(this.filterForm.shortCode.toLowerCase());

      const matchesActiveStatus =
        this.filterForm.activeStatus === "All" ||
        beverage.activeStatus === this.filterForm.activeStatus;

      return matchesBeverageName && matchesShortCode && matchesActiveStatus;
    });

    this.currentPage = 1; // Reset to first page after filtering
  }

  // Reset filters
  resetFilters() {
    this.filterForm = {
      beverageName: "",
      shortCode: "",
      activeStatus: "All",
    };
    this.beverageData = [...this.originalBeverageData];
    this.currentPage = 1;
  }

  toggleActiveStatus(beverage: Beverage) {
    beverage.activeStatus =
      beverage.activeStatus === "Active" ? "Inactive" : "Active";
    console.log(
      "Toggled active status for:",
      beverage.beverageName,
      "New status:",
      beverage.activeStatus
    );
  }

  editBeverage(beverage: Beverage) {
    this.selectedBeverage = beverage;
    this.editForm = {
      beverageName: beverage.beverageName,
      shortCode: beverage.shortCode,
      description: beverage.description,
      image: beverage.image,
      unitPrice: beverage.unitPrice,
      costPrice: beverage.costPrice,
    };
    this.imagePreview = beverage.image;
    this.selectedFile = null;
    this.isEditModalOpen = true;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }

      this.selectedFile = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.editForm.image = reader.result as string; // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.editForm.image = "";
  }

  submitEdit() {
    // Prevent form submission if no beverage is selected
    if (!this.selectedBeverage) {
      console.error("No beverage selected for editing");
      return;
    }

    // Basic form validation
    if (!this.editForm.beverageName.trim()) {
      alert("Please enter a beverage name");
      return;
    }

    if (!this.editForm.description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (this.editForm.unitPrice <= 0) {
      alert("Please enter a valid sales price");
      return;
    }

    if (this.editForm.costPrice <= 0) {
      alert("Please enter a valid cost price");
      return;
    }

    if (this.editForm.costPrice > this.editForm.unitPrice) {
      alert("Cost price cannot be greater than sales price");
      return;
    }

    this.isUploading = true;

    try {
      // Find the beverage index
      const index = this.beverageData.findIndex(
        (b) => b.id === this.selectedBeverage!.id
      );

      if (index === -1) {
        console.error("Beverage not found in data array");
        alert("Error: Beverage not found");
        return;
      }

      // Update the beverage data
      this.beverageData[index] = {
        ...this.beverageData[index],
        beverageName: this.editForm.beverageName.trim(),
        shortCode: this.editForm.shortCode.trim(),
        description: this.editForm.description.trim(),
        image: this.editForm.image || this.beverageData[index].image, // Keep original if no new image
        unitPrice: this.editForm.unitPrice,
        costPrice: this.editForm.costPrice,
      };

      // Also update the original data
      const originalIndex = this.originalBeverageData.findIndex(
        (b) => b.id === this.selectedBeverage!.id
      );
      if (originalIndex !== -1) {
        this.originalBeverageData[originalIndex] = {
          ...this.originalBeverageData[originalIndex],
          beverageName: this.editForm.beverageName.trim(),
          shortCode: this.editForm.shortCode.trim(),
          description: this.editForm.description.trim(),
          image:
            this.editForm.image ||
            this.originalBeverageData[originalIndex].image,
          unitPrice: this.editForm.unitPrice,
          costPrice: this.editForm.costPrice,
        };
      }

      console.log("Successfully updated beverage:", this.beverageData[index]);
      console.log("Updated beverage data array:", this.beverageData);

      // Show success message
      alert("Beverage updated successfully!");

      // Close modal and reset
      this.closeEditModal();
    } catch (error) {
      console.error("Error updating beverage:", error);
      alert("Error updating beverage. Please try again.");
    } finally {
      this.isUploading = false;
    }
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedBeverage = null;
    this.selectedFile = null;
    this.imagePreview = null;
    this.editForm = {
      beverageName: "",
      shortCode: "",
      description: "",
      image: "",
      unitPrice: 0,
      costPrice: 0,
    };
  }

  // Report functionality
  generateReport(): void {
    const reportColumns: ReportColumn[] = [
      { key: "id", label: "ID", type: "text" },
      { key: "beverageName", label: "Beverage Name", type: "text" },
      { key: "shortCode", label: "Short Code", type: "text" },
      { key: "description", label: "Description", type: "text" },
      {
        key: "activeStatus",
        label: "Status",
        type: "status",
        format: (value: string) => value,
      },
      { key: "addedDate", label: "Added Date", type: "text" },
      {
        key: "unitPrice",
        label: "Unit Price",
        type: "number",
        format: (value: number) => this.formatCurrency(value),
      },
      {
        key: "costPrice",
        label: "Cost Price",
        type: "number",
        format: (value: number) => this.formatCurrency(value),
      },
    ];

    // Calculate summary statistics (excluding financial metrics)
    const activeCount = this.beverageData.filter(
      (b) => b.activeStatus === "Active"
    ).length;
    const inactiveCount = this.beverageData.filter(
      (b) => b.activeStatus === "Inactive"
    ).length;

    const reportConfig: ReportConfig = {
      title: "Beverages Inventory Report",
      filters: {
        beverageName: this.filterForm.beverageName || "All",
        shortCode: this.filterForm.shortCode || "All",
        activeStatus:
          this.filterForm.activeStatus === "All"
            ? "All Statuses"
            : this.filterForm.activeStatus,
      },
      items: this.beverageData,
      columns: reportColumns,
      summary: {
        totalBeverages: this.beverageData.length,
        activeBeverages: activeCount,
        inactiveBeverages: inactiveCount,
      },
    };

    this.reportService.generateReport(reportConfig);
    this.isReportOpen = true;
  }

  closeReport(): void {
    this.isReportOpen = false;
    this.reportService.clearReport();
  }

  getStatusBadgeColor(status: string): "success" | "error" {
    return status === "Active" ? "success" : "error";
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}
