import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonComponent } from "../../ui/button/button.component";
import { TableDropdownComponent } from "../../common/table-dropdown/table-dropdown.component";
import { BadgeComponent } from "../../ui/badge/badge.component";
import { InputFieldWithSuggestionsComponent } from "../../form/input/input-field-with-suggestion";
import { SelectComponent, Option } from "../../form/select/select.component";
import { DatePickerComponent } from "../../form/date-picker/date-picker.component";
import { ReportService, ReportColumn } from "../../../services/report.service";
import { ReportViewerComponent } from "../../reports/report.component";

interface BeverageSale {
  salesId: string;
  machineId: string;
  beverage: string;
  companyName: string;
  salesDate: string;
  salesTime: string;
  amount: number;
  cups: number;
}

@Component({
  selector: "app-manage-individual-beverage-sales",
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
    InputFieldWithSuggestionsComponent,
    SelectComponent,
    DatePickerComponent,
    ReportViewerComponent,
  ],
  templateUrl: "./manage_individual_sales_details.component.html",
  styles: ``,
})
export class ManageIndividualBeverageSalesComponent {
  // Filter form values
  filterForm = {
    beverage: "All",
    machineId: "",
    companyName: "",
    dateFrom: "",
    dateTo: "",
  };

  // Report Modal Properties
  isReportModalOpen = false;

  // Beverage options
  beverageOptions: Option[] = [
    { value: "All", label: "All Beverages" },
    { value: "Coffee", label: "Coffee" },
    { value: "Tea", label: "Tea" },
    { value: "Hot Chocolate", label: "Hot Chocolate" },
    { value: "Cappuccino", label: "Cappuccino" },
    { value: "Latte", label: "Latte" },
    { value: "Espresso", label: "Espresso" },
    { value: "Green Tea", label: "Green Tea" },
    { value: "Mocha", label: "Mocha" },
    { value: "Americano", label: "Americano" },
  ];

  // Available machine IDs for suggestions
  machineIdSuggestions: string[] = [
    "VM-001",
    "VM-002",
    "VM-003",
    "VM-004",
    "VM-005",
    "VM-006",
    "VM-007",
    "VM-008",
    "VM-009",
    "VM-010",
    "VM-011",
    "VM-012",
    "VM-013",
    "VM-014",
    "VM-015",
  ];

  // Available company names for suggestions
  companyNameSuggestions: string[] = [
    "Beverage Corp",
    "Refresh Inc",
    "QuickDrink Ltd",
    "ThirstQuench Co",
    "DrinkMaster Inc",
    "BrewTech Solutions",
    "Urban Brew Co",
    "Premium Beverages LLC",
    "Global Drinks Group",
  ];

  // Original sales data - 50 records
  originalSalesData: BeverageSale[] = [
    {
      salesId: "S001",
      machineId: "VM-001",
      beverage: "Coffee",
      companyName: "Beverage Corp",
      salesDate: "2024-01-15",
      salesTime: "08:30:45",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S002",
      machineId: "VM-002",
      beverage: "Tea",
      companyName: "Refresh Inc",
      salesDate: "2024-01-15",
      salesTime: "09:15:22",
      amount: 2.0,
      cups: 1,
    },
    {
      salesId: "S003",
      machineId: "VM-001",
      beverage: "Coffee",
      companyName: "Beverage Corp",
      salesDate: "2024-01-15",
      salesTime: "10:05:33",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S004",
      machineId: "VM-003",
      beverage: "Hot Chocolate",
      companyName: "QuickDrink Ltd",
      salesDate: "2024-01-16",
      salesTime: "14:20:18",
      amount: 3.0,
      cups: 1,
    },
    {
      salesId: "S005",
      machineId: "VM-002",
      beverage: "Coffee",
      companyName: "Refresh Inc",
      salesDate: "2024-01-16",
      salesTime: "15:45:09",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S006",
      machineId: "VM-004",
      beverage: "Cappuccino",
      companyName: "Beverage Corp",
      salesDate: "2024-01-17",
      salesTime: "07:55:41",
      amount: 3.5,
      cups: 1,
    },
    {
      salesId: "S007",
      machineId: "VM-001",
      beverage: "Tea",
      companyName: "Beverage Corp",
      salesDate: "2024-01-17",
      salesTime: "11:30:15",
      amount: 2.0,
      cups: 1,
    },
    {
      salesId: "S008",
      machineId: "VM-005",
      beverage: "Coffee",
      companyName: "ThirstQuench Co",
      salesDate: "2024-01-18",
      salesTime: "16:10:28",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S009",
      machineId: "VM-003",
      beverage: "Latte",
      companyName: "QuickDrink Ltd",
      salesDate: "2024-01-18",
      salesTime: "13:25:37",
      amount: 3.25,
      cups: 1,
    },
    {
      salesId: "S010",
      machineId: "VM-002",
      beverage: "Coffee",
      companyName: "Refresh Inc",
      salesDate: "2024-01-19",
      salesTime: "08:40:52",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S011",
      machineId: "VM-001",
      beverage: "Espresso",
      companyName: "Beverage Corp",
      salesDate: "2024-01-19",
      salesTime: "12:15:44",
      amount: 2.75,
      cups: 1,
    },
    {
      salesId: "S012",
      machineId: "VM-004",
      beverage: "Green Tea",
      companyName: "Beverage Corp",
      salesDate: "2024-01-20",
      salesTime: "10:50:19",
      amount: 2.25,
      cups: 1,
    },
    {
      salesId: "S013",
      machineId: "VM-006",
      beverage: "Coffee",
      companyName: "DrinkMaster Inc",
      salesDate: "2024-01-20",
      salesTime: "07:30:11",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S014",
      machineId: "VM-007",
      beverage: "Mocha",
      companyName: "BrewTech Solutions",
      salesDate: "2024-01-21",
      salesTime: "14:45:33",
      amount: 3.75,
      cups: 1,
    },
    {
      salesId: "S015",
      machineId: "VM-005",
      beverage: "Tea",
      companyName: "ThirstQuench Co",
      salesDate: "2024-01-21",
      salesTime: "16:20:08",
      amount: 2.0,
      cups: 1,
    },
    {
      salesId: "S016",
      machineId: "VM-008",
      beverage: "Americano",
      companyName: "Urban Brew Co",
      salesDate: "2024-01-22",
      salesTime: "09:10:42",
      amount: 2.8,
      cups: 1,
    },
    {
      salesId: "S017",
      machineId: "VM-003",
      beverage: "Coffee",
      companyName: "QuickDrink Ltd",
      salesDate: "2024-01-22",
      salesTime: "11:35:27",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S018",
      machineId: "VM-009",
      beverage: "Latte",
      companyName: "Premium Beverages LLC",
      salesDate: "2024-01-23",
      salesTime: "13:50:19",
      amount: 3.25,
      cups: 1,
    },
    {
      salesId: "S019",
      machineId: "VM-002",
      beverage: "Hot Chocolate",
      companyName: "Refresh Inc",
      salesDate: "2024-01-23",
      salesTime: "15:15:54",
      amount: 3.0,
      cups: 1,
    },
    {
      salesId: "S020",
      machineId: "VM-010",
      beverage: "Coffee",
      companyName: "Global Drinks Group",
      salesDate: "2024-01-24",
      salesTime: "08:25:36",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S021",
      machineId: "VM-001",
      beverage: "Cappuccino",
      companyName: "Beverage Corp",
      salesDate: "2024-01-24",
      salesTime: "10:40:22",
      amount: 3.5,
      cups: 1,
    },
    {
      salesId: "S022",
      machineId: "VM-006",
      beverage: "Tea",
      companyName: "DrinkMaster Inc",
      salesDate: "2024-01-25",
      salesTime: "14:05:47",
      amount: 2.0,
      cups: 1,
    },
    {
      salesId: "S023",
      machineId: "VM-004",
      beverage: "Espresso",
      companyName: "Beverage Corp",
      salesDate: "2024-01-25",
      salesTime: "16:30:11",
      amount: 2.75,
      cups: 1,
    },
    {
      salesId: "S024",
      machineId: "VM-007",
      beverage: "Coffee",
      companyName: "BrewTech Solutions",
      salesDate: "2024-01-26",
      salesTime: "07:55:28",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S025",
      machineId: "VM-008",
      beverage: "Mocha",
      companyName: "Urban Brew Co",
      salesDate: "2024-01-26",
      salesTime: "12:20:39",
      amount: 3.75,
      cups: 1,
    },
    {
      salesId: "S026",
      machineId: "VM-005",
      beverage: "Green Tea",
      companyName: "ThirstQuench Co",
      salesDate: "2024-01-27",
      salesTime: "15:45:17",
      amount: 2.25,
      cups: 1,
    },
    {
      salesId: "S027",
      machineId: "VM-009",
      beverage: "Coffee",
      companyName: "Premium Beverages LLC",
      salesDate: "2024-01-27",
      salesTime: "09:10:44",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S028",
      machineId: "VM-003",
      beverage: "Americano",
      companyName: "QuickDrink Ltd",
      salesDate: "2024-01-28",
      salesTime: "11:35:26",
      amount: 2.8,
      cups: 1,
    },
    {
      salesId: "S029",
      machineId: "VM-010",
      beverage: "Latte",
      companyName: "Global Drinks Group",
      salesDate: "2024-01-28",
      salesTime: "14:00:53",
      amount: 3.25,
      cups: 1,
    },
    {
      salesId: "S030",
      machineId: "VM-002",
      beverage: "Coffee",
      companyName: "Refresh Inc",
      salesDate: "2024-01-29",
      salesTime: "16:25:38",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S031",
      machineId: "VM-001",
      beverage: "Hot Chocolate",
      companyName: "Beverage Corp",
      salesDate: "2024-01-29",
      salesTime: "08:50:21",
      amount: 3.0,
      cups: 1,
    },
    {
      salesId: "S032",
      machineId: "VM-006",
      beverage: "Cappuccino",
      companyName: "DrinkMaster Inc",
      salesDate: "2024-01-30",
      salesTime: "13:15:46",
      amount: 3.5,
      cups: 1,
    },
    {
      salesId: "S033",
      machineId: "VM-004",
      beverage: "Tea",
      companyName: "Beverage Corp",
      salesDate: "2024-01-30",
      salesTime: "15:40:12",
      amount: 2.0,
      cups: 1,
    },
    {
      salesId: "S034",
      machineId: "VM-007",
      beverage: "Espresso",
      companyName: "BrewTech Solutions",
      salesDate: "2024-01-31",
      salesTime: "10:05:37",
      amount: 2.75,
      cups: 1,
    },
    {
      salesId: "S035",
      machineId: "VM-008",
      beverage: "Coffee",
      companyName: "Urban Brew Co",
      salesDate: "2024-01-31",
      salesTime: "12:30:59",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S036",
      machineId: "VM-005",
      beverage: "Mocha",
      companyName: "ThirstQuench Co",
      salesDate: "2024-02-01",
      salesTime: "14:55:24",
      amount: 3.75,
      cups: 1,
    },
    {
      salesId: "S037",
      machineId: "VM-009",
      beverage: "Green Tea",
      companyName: "Premium Beverages LLC",
      salesDate: "2024-02-01",
      salesTime: "17:20:48",
      amount: 2.25,
      cups: 1,
    },
    {
      salesId: "S038",
      machineId: "VM-003",
      beverage: "Coffee",
      companyName: "QuickDrink Ltd",
      salesDate: "2024-02-02",
      salesTime: "09:45:13",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S039",
      machineId: "VM-010",
      beverage: "Americano",
      companyName: "Global Drinks Group",
      salesDate: "2024-02-02",
      salesTime: "11:10:35",
      amount: 2.8,
      cups: 1,
    },
    {
      salesId: "S040",
      machineId: "VM-002",
      beverage: "Latte",
      companyName: "Refresh Inc",
      salesDate: "2024-02-03",
      salesTime: "13:35:58",
      amount: 3.25,
      cups: 1,
    },
    {
      salesId: "S041",
      machineId: "VM-001",
      beverage: "Coffee",
      companyName: "Beverage Corp",
      salesDate: "2024-02-03",
      salesTime: "16:00:21",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S042",
      machineId: "VM-006",
      beverage: "Hot Chocolate",
      companyName: "DrinkMaster Inc",
      salesDate: "2024-02-04",
      salesTime: "08:25:44",
      amount: 3.0,
      cups: 1,
    },
    {
      salesId: "S043",
      machineId: "VM-004",
      beverage: "Cappuccino",
      companyName: "Beverage Corp",
      salesDate: "2024-02-04",
      salesTime: "10:50:07",
      amount: 3.5,
      cups: 1,
    },
    {
      salesId: "S044",
      machineId: "VM-007",
      beverage: "Tea",
      companyName: "BrewTech Solutions",
      salesDate: "2024-02-05",
      salesTime: "14:15:32",
      amount: 2.0,
      cups: 1,
    },
    {
      salesId: "S045",
      machineId: "VM-008",
      beverage: "Espresso",
      companyName: "Urban Brew Co",
      salesDate: "2024-02-05",
      salesTime: "16:40:55",
      amount: 2.75,
      cups: 1,
    },
    {
      salesId: "S046",
      machineId: "VM-005",
      beverage: "Coffee",
      companyName: "ThirstQuench Co",
      salesDate: "2024-02-06",
      salesTime: "09:05:18",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S047",
      machineId: "VM-009",
      beverage: "Mocha",
      companyName: "Premium Beverages LLC",
      salesDate: "2024-02-06",
      salesTime: "11:30:41",
      amount: 3.75,
      cups: 1,
    },
    {
      salesId: "S048",
      machineId: "VM-003",
      beverage: "Green Tea",
      companyName: "QuickDrink Ltd",
      salesDate: "2024-02-07",
      salesTime: "13:55:04",
      amount: 2.25,
      cups: 1,
    },
    {
      salesId: "S049",
      machineId: "VM-010",
      beverage: "Coffee",
      companyName: "Global Drinks Group",
      salesDate: "2024-02-07",
      salesTime: "16:20:27",
      amount: 2.5,
      cups: 1,
    },
    {
      salesId: "S050",
      machineId: "VM-002",
      beverage: "Americano",
      companyName: "Refresh Inc",
      salesDate: "2024-02-08",
      salesTime: "08:45:50",
      amount: 2.8,
      cups: 1,
    },
  ];

  // Filtered data
  salesData: BeverageSale[] = [...this.originalSalesData];

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private reportService: ReportService) {}

  // Update methods for input fields
  updateMachineId(value: string | number) {
    this.filterForm.machineId = value.toString();
  }

  updateCompanyName(value: string | number) {
    this.filterForm.companyName = value.toString();
  }

  // Date change handlers
  onDateFromChange(event: any) {
    this.filterForm.dateFrom = event.dateStr || "";
  }

  onDateToChange(event: any) {
    this.filterForm.dateTo = event.dateStr || "";
  }

  // Apply filters
  applyFilters() {
    this.salesData = this.originalSalesData.filter((sale) => {
      // Beverage filter
      const matchesBeverage =
        this.filterForm.beverage === "All" ||
        sale.beverage === this.filterForm.beverage;

      // Machine ID filter
      const matchesMachineId =
        !this.filterForm.machineId ||
        sale.machineId
          .toLowerCase()
          .includes(this.filterForm.machineId.toLowerCase());

      // Company name filter
      const matchesCompanyName =
        !this.filterForm.companyName ||
        sale.companyName
          .toLowerCase()
          .includes(this.filterForm.companyName.toLowerCase());

      // Date range filter (only apply if dates are selected)
      let matchesDateRange = true;
      if (this.filterForm.dateFrom && this.filterForm.dateTo) {
        const saleDate = new Date(sale.salesDate);
        const fromDate = new Date(this.filterForm.dateFrom);
        const toDate = new Date(this.filterForm.dateTo);
        matchesDateRange = saleDate >= fromDate && saleDate <= toDate;
      } else if (this.filterForm.dateFrom) {
        const saleDate = new Date(sale.salesDate);
        const fromDate = new Date(this.filterForm.dateFrom);
        matchesDateRange = saleDate >= fromDate;
      } else if (this.filterForm.dateTo) {
        const saleDate = new Date(sale.salesDate);
        const toDate = new Date(this.filterForm.dateTo);
        matchesDateRange = saleDate <= toDate;
      }

      return (
        matchesBeverage &&
        matchesMachineId &&
        matchesCompanyName &&
        matchesDateRange
      );
    });

    this.currentPage = 1; // Reset to first page after filtering
  }

  // Generate Sales Report
  generateReport() {
    if (this.salesData.length === 0) {
      console.warn("No sales data available for report");
      return;
    }

    // Calculate beverage distribution
    const beverageDistribution = this.salesData.reduce((acc, sale) => {
      acc[sale.beverage] = (acc[sale.beverage] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate company distribution
    const companyDistribution = this.salesData.reduce((acc, sale) => {
      acc[sale.companyName] = (acc[sale.companyName] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate machine distribution
    const machineDistribution = this.salesData.reduce((acc, sale) => {
      acc[sale.machineId] = (acc[sale.machineId] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const summary = {
      totalCupsSold: this.totalCupsSold,
      totalRevenue: this.totalRevenue,
      averageSaleAmount: parseFloat(
        (this.totalRevenue / this.totalCupsSold).toFixed(2)
      ),
      dateRange: this.getDateRangeText(),
      topBeverage: this.getTopItem(beverageDistribution),
      topCompany: this.getTopItem(companyDistribution),
      topMachine: this.getTopItem(machineDistribution),
      totalRecords: this.salesData.length,
    };

    const reportColumns: ReportColumn[] = [
      { key: "salesId", label: "Sales ID", type: "text" },
      { key: "machineId", label: "Machine ID", type: "text" },
      { key: "beverage", label: "Beverage", type: "text" },
      { key: "companyName", label: "Company", type: "text" },
      { key: "salesDate", label: "Date", type: "text" },
      { key: "salesTime", label: "Time", type: "text" },
      {
        key: "amount",
        label: "Amount",
        type: "number",
        format: (value) => `$${value.toFixed(2)}`,
      },
      { key: "cups", label: "Cups", type: "number" },
    ];

    this.reportService.generateReport({
      title: "Beverage Sales Report",
      filters: { ...this.filterForm },
      items: [...this.salesData],
      columns: reportColumns,
      summary: summary,
    });

    this.isReportModalOpen = true;
  }

  // Helper method to get top item from distribution
  private getTopItem(distribution: { [key: string]: number }): string {
    const entries = Object.entries(distribution);
    if (entries.length === 0) return "N/A";

    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return `${sorted[0][0]} (${sorted[0][1]} sales)`;
  }

  // Helper method to get date range text
  private getDateRangeText(): string {
    if (this.filterForm.dateFrom && this.filterForm.dateTo) {
      return `${this.filterForm.dateFrom} to ${this.filterForm.dateTo}`;
    } else if (this.filterForm.dateFrom) {
      return `From ${this.filterForm.dateFrom}`;
    } else if (this.filterForm.dateTo) {
      return `Until ${this.filterForm.dateTo}`;
    } else {
      return "All dates";
    }
  }

  closeReportModal() {
    this.isReportModalOpen = false;
    this.reportService.clearReport();
  }

  // Reset filters
  resetFilters() {
    this.filterForm = {
      beverage: "All",
      machineId: "",
      companyName: "",
      dateFrom: "",
      dateTo: "",
    };
    this.salesData = [...this.originalSalesData];
    this.currentPage = 1;
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.salesData.length / this.itemsPerPage);
  }

  get currentItems(): BeverageSale[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.salesData.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Summary calculations
  get totalCupsSold(): number {
    return this.salesData.reduce((total, sale) => total + sale.cups, 0);
  }

  get totalRevenue(): number {
    return this.salesData.reduce((total, sale) => total + sale.amount, 0);
  }

  get selectedBeverage(): string {
    return this.filterForm.beverage === "All"
      ? "All Beverages"
      : this.filterForm.beverage;
  }
}
