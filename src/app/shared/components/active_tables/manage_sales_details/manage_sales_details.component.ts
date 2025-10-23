import { CommonModule } from "@angular/common";
import { Component, ViewChild  } from "@angular/core";
import { ButtonComponent } from "../../ui/button/button.component";
import { TableDropdownComponent } from "../../common/table-dropdown/table-dropdown.component";
import { BadgeComponent } from "../../ui/badge/badge.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { InputFieldWithSuggestionsComponent } from "../../form/input/input-field-with-suggestion";
import { DatePickerComponent } from "../../form/date-picker/date-picker.component";
import { SelectComponent, Option } from "../../form/select/select.component";
import { ReportService, ReportColumn } from "../../../services/report.service";
import { ReportViewerComponent } from "../../reports/report.component";

interface SaleItem {
  beverageName: string;
  soldAmount: number;
}

interface SalesRecord {
  salesId: string;
  machineId: string;
  registeredCompany: string; // Added this missing property
  totalCups: number;
  totalPrice: number;
  paymentMethod: string;
  date: string;
  time: string;
  items: SaleItem[];
}

@Component({
  selector: "app-total-sales-table",
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
    ModalComponent,
    InputFieldComponent,
    InputFieldWithSuggestionsComponent,
    SelectComponent,
    DatePickerComponent,
    ReportViewerComponent,
  ],
  templateUrl: "./manage_sales_details.component.html",
  styles: ``,
})
export class TotalSalesTableComponent {
  // ViewChild references to reset date pickers
  @ViewChild('dateFromPicker') dateFromPicker!: DatePickerComponent;
  @ViewChild('dateToPicker') dateToPicker!: DatePickerComponent;

  originalSalesData: SalesRecord[] = [
    {
      salesId: "SALE-001",
      machineId: "MACH-001",
      totalCups: 45,
      totalPrice: 5675.5,
      paymentMethod: "Credit Card",
      date: "2025-08-21",
      time: "08:15:25",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 15 },
        { beverageName: "Latte", soldAmount: 12 },
        { beverageName: "Espresso", soldAmount: 10 },
        { beverageName: "Mocha", soldAmount: 8 },
      ],
    },
    {
      salesId: "SALE-002",
      machineId: "MACH-002",
      totalCups: 32,
      totalPrice: 4120.0,
      paymentMethod: "Cash",
      date: "2025-08-21",
      time: "10:30:42",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Green Tea", soldAmount: 10 },
        { beverageName: "Black Tea", soldAmount: 8 },
        { beverageName: "Hot Chocolate", soldAmount: 7 },
        { beverageName: "Americano", soldAmount: 7 },
      ],
    },
    {
      salesId: "SALE-003",
      machineId: "MACH-003",
      totalCups: 28,
      totalPrice: 3525.75,
      paymentMethod: "Mobile Payment",
      date: "2025-08-22",
      time: "09:45:18",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Iced Coffee", soldAmount: 12 },
        { beverageName: "Cold Brew", soldAmount: 8 },
        { beverageName: "Frappuccino", soldAmount: 5 },
        { beverageName: "Smoothie", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-004",
      machineId: "MACH-001",
      totalCups: 51,
      totalPrice: 6430.25,
      paymentMethod: "Credit Card",
      date: "2025-08-22",
      time: "14:20:33",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 18 },
        { beverageName: "Latte", soldAmount: 15 },
        { beverageName: "Espresso", soldAmount: 10 },
        { beverageName: "Macchiato", soldAmount: 8 },
      ],
    },
    {
      salesId: "SALE-005",
      machineId: "MACH-002",
      totalCups: 23,
      totalPrice: 2895.0,
      paymentMethod: "Cash",
      date: "2025-08-23",
      time: "11:05:57",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Green Tea", soldAmount: 8 },
        { beverageName: "Herbal Tea", soldAmount: 7 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
        { beverageName: "White Coffee", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-006",
      machineId: "MACH-003",
      totalCups: 37,
      totalPrice: 4675.8,
      paymentMethod: "Mobile Payment",
      date: "2025-08-24",
      time: "13:40:12",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Iced Latte", soldAmount: 14 },
        { beverageName: "Cold Brew", soldAmount: 9 },
        { beverageName: "Frappuccino", soldAmount: 8 },
        { beverageName: "Smoothie", soldAmount: 6 },
      ],
    },
    {
      salesId: "SALE-007",
      machineId: "MACH-001",
      totalCups: 42,
      totalPrice: 5280.5,
      paymentMethod: "Credit Card",
      date: "2025-08-25",
      time: "16:25:44",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 16 },
        { beverageName: "Latte", soldAmount: 12 },
        { beverageName: "Espresso", soldAmount: 8 },
        { beverageName: "Mocha", soldAmount: 6 },
      ],
    },
    {
      salesId: "SALE-008",
      machineId: "MACH-002",
      totalCups: 29,
      totalPrice: 3650.0,
      paymentMethod: "Cash",
      date: "2025-08-26",
      time: "10:55:29",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Black Tea", soldAmount: 11 },
        { beverageName: "Green Tea", soldAmount: 9 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
        { beverageName: "Americano", soldAmount: 4 },
      ],
    },
    {
      salesId: "SALE-009",
      machineId: "MACH-003",
      totalCups: 38,
      totalPrice: 4785.25,
      paymentMethod: "Credit Card",
      date: "2025-08-27",
      time: "15:10:33",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Latte", soldAmount: 14 },
        { beverageName: "Cappuccino", soldAmount: 12 },
        { beverageName: "Flat White", soldAmount: 7 },
        { beverageName: "Espresso", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-010",
      machineId: "MACH-001",
      totalCups: 41,
      totalPrice: 5165.75,
      paymentMethod: "Mobile Payment",
      date: "2025-08-28",
      time: "12:30:18",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Coffee", soldAmount: 15 },
        { beverageName: "Cold Brew", soldAmount: 10 },
        { beverageName: "Frappuccino", soldAmount: 9 },
        { beverageName: "Smoothie", soldAmount: 7 },
      ],
    },
    {
      salesId: "SALE-011",
      machineId: "MACH-002",
      totalCups: 33,
      totalPrice: 4155.0,
      paymentMethod: "Cash",
      date: "2025-08-29",
      time: "09:20:45",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Green Tea", soldAmount: 12 },
        { beverageName: "Black Tea", soldAmount: 9 },
        { beverageName: "Herbal Tea", soldAmount: 7 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-012",
      machineId: "MACH-003",
      totalCups: 47,
      totalPrice: 5910.5,
      paymentMethod: "Credit Card",
      date: "2025-08-30",
      time: "14:45:22",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 17 },
        { beverageName: "Latte", soldAmount: 13 },
        { beverageName: "Mocha", soldAmount: 9 },
        { beverageName: "Macchiato", soldAmount: 8 },
      ],
    },
    {
      salesId: "SALE-013",
      machineId: "MACH-001",
      totalCups: 26,
      totalPrice: 3270.25,
      paymentMethod: "Mobile Payment",
      date: "2025-08-31",
      time: "11:15:38",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Latte", soldAmount: 10 },
        { beverageName: "Cold Brew", soldAmount: 8 },
        { beverageName: "Frappuccino", soldAmount: 5 },
        { beverageName: "Smoothie", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-014",
      machineId: "MACH-002",
      totalCups: 35,
      totalPrice: 4405.75,
      paymentMethod: "Cash",
      date: "2025-09-01",
      time: "16:30:19",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Black Tea", soldAmount: 13 },
        { beverageName: "Green Tea", soldAmount: 10 },
        { beverageName: "Americano", soldAmount: 7 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-015",
      machineId: "MACH-003",
      totalCups: 44,
      totalPrice: 5540.0,
      paymentMethod: "Credit Card",
      date: "2025-09-02",
      time: "13:25:47",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Latte", soldAmount: 16 },
        { beverageName: "Cappuccino", soldAmount: 14 },
        { beverageName: "Espresso", soldAmount: 8 },
        { beverageName: "Flat White", soldAmount: 6 },
      ],
    },
    {
      salesId: "SALE-016",
      machineId: "MACH-001",
      totalCups: 31,
      totalPrice: 3900.5,
      paymentMethod: "Mobile Payment",
      date: "2025-09-03",
      time: "10:40:33",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Coffee", soldAmount: 12 },
        { beverageName: "Cold Brew", soldAmount: 9 },
        { beverageName: "Frappuccino", soldAmount: 6 },
        { beverageName: "Smoothie", soldAmount: 4 },
      ],
    },
    {
      salesId: "SALE-017",
      machineId: "MACH-002",
      totalCups: 39,
      totalPrice: 4910.25,
      paymentMethod: "Cash",
      date: "2025-09-04",
      time: "15:55:28",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Green Tea", soldAmount: 14 },
        { beverageName: "Black Tea", soldAmount: 11 },
        { beverageName: "Herbal Tea", soldAmount: 8 },
        { beverageName: "Hot Chocolate", soldAmount: 6 },
      ],
    },
    {
      salesId: "SALE-018",
      machineId: "MACH-003",
      totalCups: 52,
      totalPrice: 6545.75,
      paymentMethod: "Credit Card",
      date: "2025-09-05",
      time: "12:10:42",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 19 },
        { beverageName: "Latte", soldAmount: 16 },
        { beverageName: "Mocha", soldAmount: 10 },
        { beverageName: "Macchiato", soldAmount: 7 },
      ],
    },
    {
      salesId: "SALE-019",
      machineId: "MACH-001",
      totalCups: 27,
      totalPrice: 3395.0,
      paymentMethod: "Mobile Payment",
      date: "2025-09-06",
      time: "17:20:15",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Latte", soldAmount: 11 },
        { beverageName: "Cold Brew", soldAmount: 8 },
        { beverageName: "Frappuccino", soldAmount: 5 },
        { beverageName: "Smoothie", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-020",
      machineId: "MACH-002",
      totalCups: 36,
      totalPrice: 4530.5,
      paymentMethod: "Cash",
      date: "2025-09-07",
      time: "14:35:29",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Black Tea", soldAmount: 13 },
        { beverageName: "Green Tea", soldAmount: 11 },
        { beverageName: "Americano", soldAmount: 7 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-021",
      machineId: "MACH-003",
      totalCups: 43,
      totalPrice: 5415.25,
      paymentMethod: "Credit Card",
      date: "2025-09-08",
      time: "11:50:44",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Latte", soldAmount: 16 },
        { beverageName: "Cappuccino", soldAmount: 14 },
        { beverageName: "Espresso", soldAmount: 7 },
        { beverageName: "Flat White", soldAmount: 6 },
      ],
    },
    {
      salesId: "SALE-022",
      machineId: "MACH-001",
      totalCups: 34,
      totalPrice: 4275.75,
      paymentMethod: "Mobile Payment",
      date: "2025-09-09",
      time: "09:05:58",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Coffee", soldAmount: 13 },
        { beverageName: "Cold Brew", soldAmount: 10 },
        { beverageName: "Frappuccino", soldAmount: 7 },
        { beverageName: "Smoothie", soldAmount: 4 },
      ],
    },
    {
      salesId: "SALE-023",
      machineId: "MACH-002",
      totalCups: 40,
      totalPrice: 5030.0,
      paymentMethod: "Cash",
      date: "2025-09-10",
      time: "16:15:33",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Green Tea", soldAmount: 15 },
        { beverageName: "Black Tea", soldAmount: 12 },
        { beverageName: "Herbal Tea", soldAmount: 8 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-024",
      machineId: "MACH-003",
      totalCups: 49,
      totalPrice: 6165.5,
      paymentMethod: "Credit Card",
      date: "2025-09-11",
      time: "13:30:47",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 18 },
        { beverageName: "Latte", soldAmount: 15 },
        { beverageName: "Mocha", soldAmount: 9 },
        { beverageName: "Macchiato", soldAmount: 7 },
      ],
    },
    {
      salesId: "SALE-025",
      machineId: "MACH-001",
      totalCups: 30,
      totalPrice: 3775.25,
      paymentMethod: "Mobile Payment",
      date: "2025-09-12",
      time: "10:45:12",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Latte", soldAmount: 12 },
        { beverageName: "Cold Brew", soldAmount: 9 },
        { beverageName: "Frappuccino", soldAmount: 6 },
        { beverageName: "Smoothie", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-026",
      machineId: "MACH-002",
      totalCups: 37,
      totalPrice: 4655.75,
      paymentMethod: "Cash",
      date: "2025-09-13",
      time: "15:00:26",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Black Tea", soldAmount: 14 },
        { beverageName: "Green Tea", soldAmount: 11 },
        { beverageName: "Americano", soldAmount: 7 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-027",
      machineId: "MACH-003",
      totalCups: 46,
      totalPrice: 5790.0,
      paymentMethod: "Credit Card",
      date: "2025-09-14",
      time: "12:15:41",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Latte", soldAmount: 17 },
        { beverageName: "Cappuccino", soldAmount: 15 },
        { beverageName: "Espresso", soldAmount: 8 },
        { beverageName: "Flat White", soldAmount: 6 },
      ],
    },
    {
      salesId: "SALE-028",
      machineId: "MACH-001",
      totalCups: 32,
      totalPrice: 4025.5,
      paymentMethod: "Mobile Payment",
      date: "2025-09-15",
      time: "17:25:55",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Coffee", soldAmount: 13 },
        { beverageName: "Cold Brew", soldAmount: 10 },
        { beverageName: "Frappuccino", soldAmount: 6 },
        { beverageName: "Smoothie", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-029",
      machineId: "MACH-002",
      totalCups: 41,
      totalPrice: 5160.25,
      paymentMethod: "Cash",
      date: "2025-09-16",
      time: "14:40:19",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Green Tea", soldAmount: 15 },
        { beverageName: "Black Tea", soldAmount: 13 },
        { beverageName: "Herbal Tea", soldAmount: 8 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-030",
      machineId: "MACH-003",
      totalCups: 54,
      totalPrice: 6795.75,
      paymentMethod: "Credit Card",
      date: "2025-09-17",
      time: "11:55:34",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 20 },
        { beverageName: "Latte", soldAmount: 17 },
        { beverageName: "Mocha", soldAmount: 10 },
        { beverageName: "Macchiato", soldAmount: 7 },
      ],
    },
    {
      salesId: "SALE-031",
      machineId: "MACH-001",
      totalCups: 29,
      totalPrice: 3645.0,
      paymentMethod: "Mobile Payment",
      date: "2025-09-18",
      time: "09:10:48",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Latte", soldAmount: 12 },
        { beverageName: "Cold Brew", soldAmount: 9 },
        { beverageName: "Frappuccino", soldAmount: 5 },
        { beverageName: "Smoothie", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-032",
      machineId: "MACH-002",
      totalCups: 38,
      totalPrice: 4780.5,
      paymentMethod: "Cash",
      date: "2025-09-19",
      time: "16:20:13",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Black Tea", soldAmount: 14 },
        { beverageName: "Green Tea", soldAmount: 12 },
        { beverageName: "Americano", soldAmount: 7 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-033",
      machineId: "MACH-003",
      totalCups: 45,
      totalPrice: 5665.25,
      paymentMethod: "Credit Card",
      date: "2025-09-20",
      time: "13:35:27",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Latte", soldAmount: 17 },
        { beverageName: "Cappuccino", soldAmount: 15 },
        { beverageName: "Espresso", soldAmount: 8 },
        { beverageName: "Flat White", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-034",
      machineId: "MACH-001",
      totalCups: 33,
      totalPrice: 4150.75,
      paymentMethod: "Mobile Payment",
      date: "2025-09-21",
      time: "10:50:42",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Coffee", soldAmount: 13 },
        { beverageName: "Cold Brew", soldAmount: 10 },
        { beverageName: "Frappuccino", soldAmount: 6 },
        { beverageName: "Smoothie", soldAmount: 4 },
      ],
    },
    {
      salesId: "SALE-035",
      machineId: "MACH-002",
      totalCups: 42,
      totalPrice: 5285.0,
      paymentMethod: "Cash",
      date: "2025-09-22",
      time: "17:05:56",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Green Tea", soldAmount: 16 },
        { beverageName: "Black Tea", soldAmount: 13 },
        { beverageName: "Herbal Tea", soldAmount: 8 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-036",
      machineId: "MACH-003",
      totalCups: 51,
      totalPrice: 6415.5,
      paymentMethod: "Credit Card",
      date: "2025-09-23",
      time: "14:20:11",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Cappuccino", soldAmount: 19 },
        { beverageName: "Latte", soldAmount: 16 },
        { beverageName: "Mocha", soldAmount: 9 },
        { beverageName: "Macchiato", soldAmount: 7 },
      ],
    },
    {
      salesId: "SALE-037",
      machineId: "MACH-001",
      totalCups: 28,
      totalPrice: 3520.25,
      paymentMethod: "Mobile Payment",
      date: "2025-10-15",
      time: "11:35:25",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Latte", soldAmount: 11 },
        { beverageName: "Cold Brew", soldAmount: 8 },
        { beverageName: "Frappuccino", soldAmount: 6 },
        { beverageName: "Smoothie", soldAmount: 3 },
      ],
    },
    {
      salesId: "SALE-038",
      machineId: "MACH-002",
      totalCups: 39,
      totalPrice: 4905.75,
      paymentMethod: "Cash",
      date: "2025-10-16",
      time: "18:45:39",
      registeredCompany: "JavaJoy Enterprises",
      items: [
        { beverageName: "Black Tea", soldAmount: 15 },
        { beverageName: "Green Tea", soldAmount: 12 },
        { beverageName: "Americano", soldAmount: 7 },
        { beverageName: "Hot Chocolate", soldAmount: 5 },
      ],
    },
    {
      salesId: "SALE-039",
      machineId: "MACH-003",
      totalCups: 48,
      totalPrice: 6040.0,
      paymentMethod: "Credit Card",
      date: "2025-10-17",
      time: "15:00:54",
      registeredCompany: "CafeDelight Ltd.",
      items: [
        { beverageName: "Latte", soldAmount: 18 },
        { beverageName: "Cappuccino", soldAmount: 16 },
        { beverageName: "Espresso", soldAmount: 8 },
        { beverageName: "Flat White", soldAmount: 6 },
      ],
    },
    {
      salesId: "SALE-040",
      machineId: "MACH-001",
      totalCups: 35,
      totalPrice: 4400.5,
      paymentMethod: "Mobile Payment",
      date: "2025-10-21",
      time: "12:15:08",
      registeredCompany: "BrewMaster Inc.",
      items: [
        { beverageName: "Iced Coffee", soldAmount: 14 },
        { beverageName: "Cold Brew", soldAmount: 10 },
        { beverageName: "Frappuccino", soldAmount: 7 },
        { beverageName: "Smoothie", soldAmount: 4 },
      ],
    },
  ];

  // Default dates for reset
  private defaultDateFrom: string = this.getFormattedDate(new Date());
  private defaultDateTo: string = this.getFormattedDate(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  ); // Tomorrow

  // Filter form values
  filterForm = {
    companyName: "",
    machineId: "",
    paymentMethod: "All",
    dateFrom: this.getFormattedDate(new Date()),
    dateTo: this.getFormattedDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), // Tomorrow
  };

  // Report Modal Properties
  isReportModalOpen = false;

  // Payment Method options
  paymentMethodOptions: Option[] = [
    { value: "All", label: "All" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Cash", label: "Cash" },
    { value: "Mobile Payment", label: "Mobile Payment" },
  ];

  // Filtered data - this will be displayed in the table
  salesData: SalesRecord[] = [...this.originalSalesData];

  currentPage = 1;
  itemsPerPage = 5;
  selectedSale: SalesRecord | null = null;
  isModalOpen = false;

  constructor(private reportService: ReportService) {
    this.applyFilters(); // Apply initial filters on load
  }

  // Generate Sales Report
  generateReport() {
    if (this.salesData.length === 0) {
      console.warn("No sales data available for report");
      return;
    }

    // Calculate payment method distribution
    const paymentDistribution = this.salesData.reduce((acc, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate company distribution
    const companyDistribution = this.salesData.reduce((acc, sale) => {
      acc[sale.registeredCompany] = (acc[sale.registeredCompany] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate machine distribution
    const machineDistribution = this.salesData.reduce((acc, sale) => {
      acc[sale.machineId] = (acc[sale.machineId] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate beverage distribution from all items
    const beverageDistribution = this.salesData.reduce((acc, sale) => {
      sale.items.forEach((item) => {
        acc[item.beverageName] =
          (acc[item.beverageName] || 0) + item.soldAmount;
      });
      return acc;
    }, {} as { [key: string]: number });

    const summary = {
      totalCupsSold: this.totalCupsSold,
      totalRevenue: this.totalAmount,
      averageSaleValue: parseFloat(
        (this.totalAmount / this.salesData.length).toFixed(2)
      ),
      averageCupsPerSale: parseFloat(
        (this.totalCupsSold / this.salesData.length).toFixed(1)
      ),
      dateRange: this.getDateRangeText(),
      topPaymentMethod: this.getTopItem(paymentDistribution),
      topCompany: this.getTopItem(companyDistribution),
      topMachine: this.getTopItem(machineDistribution),
      topBeverage: this.getTopItem(beverageDistribution),
      totalRecords: this.salesData.length,
    };

    const reportColumns: ReportColumn[] = [
      { key: "salesId", label: "Sales ID", type: "text" },
      { key: "machineId", label: "Machine ID", type: "text" },
      { key: "registeredCompany", label: "Company", type: "text" },
      { key: "totalCups", label: "Total Cups", type: "number" },
      {
        key: "totalPrice",
        label: "Total Price",
        type: "number",
        format: (value) => this.formatCurrency(value),
      },
      { key: "paymentMethod", label: "Payment Method", type: "text" },
      {
        key: "date",
        label: "Date",
        type: "text",
        format: (value) => this.formatDate(value),
      },
      {
        key: "time",
        label: "Time",
        type: "text",
        format: (value) => this.formatTime(value),
      },
    ];

    this.reportService.generateReport({
      title: "Total Sales Report",
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
    return `${sorted[0][0]} (${sorted[0][1]})`;
  }

  // Helper method to get date range text
  private getDateRangeText(): string {
    if (this.filterForm.dateFrom && this.filterForm.dateTo) {
      return `${this.formatDate(this.filterForm.dateFrom)} to ${this.formatDate(
        this.filterForm.dateTo
      )}`;
    } else if (this.filterForm.dateFrom) {
      return `From ${this.formatDate(this.filterForm.dateFrom)}`;
    } else if (this.filterForm.dateTo) {
      return `Until ${this.formatDate(this.filterForm.dateTo)}`;
    } else {
      return "All dates";
    }
  }

  closeReportModal() {
    this.isReportModalOpen = false;
    this.reportService.clearReport();
  }

  // Helper method to format date as YYYY-MM-DD
  private getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Get unique companies and machine IDs for suggestions
  get companySuggestions(): string[] {
    return [
      ...new Set(this.originalSalesData.map((sale) => sale.registeredCompany)),
    ];
  }

  get machineIdSuggestions(): string[] {
    return [...new Set(this.originalSalesData.map((sale) => sale.machineId))];
  }

  // Summary statistics
  get totalCupsSold(): number {
    return this.salesData.reduce((total, sale) => total + sale.totalCups, 0);
  }

  get totalAmount(): number {
    return this.salesData.reduce((total, sale) => total + sale.totalPrice, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.salesData.length / this.itemsPerPage);
  }

  get currentItems(): SalesRecord[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.salesData.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Update methods for form inputs
  updateCompanyName(value: string | number) {
    this.filterForm.companyName = value.toString();
  }

  updateMachineId(value: string | number) {
    this.filterForm.machineId = value.toString();
  }

  updatePaymentMethod(value: string | number) {
    this.filterForm.paymentMethod = value.toString();
  }

  updateDateFrom(event: any) {
    this.filterForm.dateFrom = event.dateStr;
  }

  updateDateTo(event: any) {
    this.filterForm.dateTo = event.dateStr;
  }

  // Apply filters
  applyFilters() {
    this.salesData = this.originalSalesData.filter((sale) => {
      const matchesCompany =
        !this.filterForm.companyName ||
        sale.registeredCompany
          .toLowerCase()
          .includes(this.filterForm.companyName.toLowerCase());

      const matchesMachineId =
        !this.filterForm.machineId ||
        sale.machineId
          .toLowerCase()
          .includes(this.filterForm.machineId.toLowerCase());

      const matchesPaymentMethod =
        this.filterForm.paymentMethod === "All" ||
        sale.paymentMethod === this.filterForm.paymentMethod;

      const saleDate = new Date(sale.date);
      const fromDate = new Date(this.filterForm.dateFrom);
      const toDate = new Date(this.filterForm.dateTo);

      // Set time to beginning and end of day for proper date comparison
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      saleDate.setHours(12, 0, 0, 0); // Set to noon for neutral time comparison

      const matchesDateRange = saleDate >= fromDate && saleDate <= toDate;

      return (
        matchesCompany &&
        matchesMachineId &&
        matchesPaymentMethod &&
        matchesDateRange
      );
    });

    this.currentPage = 1; // Reset to first page after filtering
  }

  // Reset filters - updated to properly reset date pickers
  resetFilters() {
    // Reset filter form values
    this.filterForm = {
      companyName: "",
      machineId: "",
      paymentMethod: "All",
      dateFrom: this.defaultDateFrom,
      dateTo: this.defaultDateTo,
    };

    // Reset the sales data to show all records
    this.salesData = [...this.originalSalesData];
    this.currentPage = 1;

    // Reset date pickers if they are available
    setTimeout(() => {
      if (this.dateFromPicker) {
        this.dateFromPicker.resetToDefault();
      }
      if (this.dateToPicker) {
        this.dateToPicker.resetToDefault();
      }
    }, 0);

    // Trigger the filter to update the display
    this.applyFilters();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  }

  formatCurrency(amount: number): string {
    return `LKR ${amount.toFixed(2)}`;
  }

  openSaleDetails(sale: SalesRecord) {
    this.selectedSale = sale;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedSale = null;
  }

  handleViewMore(sale: SalesRecord) {
    this.openSaleDetails(sale);
  }
}
