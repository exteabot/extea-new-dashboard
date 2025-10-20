import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ButtonComponent } from "../../ui/button/button.component";
import { SelectComponent, Option } from "../../form/select/select.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { TableDropdownComponent } from "../../common/table-dropdown/table-dropdown.component";
import { ModalComponent } from "../../ui/modal/modal.component";

interface MachineContent {
  id: string;
  slotNumber: number;
  beverage: string;
  availableCups: number;
  waterPerCup: number; // in ml
  powderPerCup: number; // in grams
  mixingTime: number; // in seconds
  price: number;
}

interface Machine {
  id: string;
  machineId: string;
  registeredCompany: string;
  slots: number;
  powerStatus: "Active" | "Inactive";
  activeStatus: "Active" | "Inactive";
  sugarLevel: number;
  waterLevel: number;
  address: string;
}

@Component({
  selector: "app-machine-detail-content",
  imports: [
    CommonModule,
    ButtonComponent,
    SelectComponent,
    InputFieldComponent,
    TableDropdownComponent,
    ModalComponent,
  ],
  templateUrl: "./machine_content_details.component.html",
  styles: ``,
})
export class MachineContentDetailsComponent implements OnInit {
  // Available machine IDs from the machine details
  machineOptions: Option[] = [];
  selectedMachineId: string = "";

  // Sample machine data (would normally come from a service)
  machines: Machine[] = [
    {
      id: "M001",
      machineId: "VM-001",
      registeredCompany: "Beverage Corp",
      slots: 8,
      powerStatus: "Active",
      activeStatus: "Active",
      sugarLevel: 85,
      waterLevel: 90,
      address: "123 Main St, Downtown",
    },
    {
      id: "M002",
      machineId: "VM-002",
      registeredCompany: "Refresh Inc",
      slots: 6,
      powerStatus: "Inactive",
      activeStatus: "Inactive",
      sugarLevel: 45,
      waterLevel: 20,
      address: "456 Oak Ave, Midtown",
    },
    {
      id: "M003",
      machineId: "VM-003",
      registeredCompany: "QuickDrink Ltd",
      slots: 10,
      powerStatus: "Active",
      activeStatus: "Active",
      sugarLevel: 95,
      waterLevel: 80,
      address: "789 Pine Rd, Uptown",
    },
    {
      id: "M004",
      machineId: "VM-004",
      registeredCompany: "Beverage Corp",
      slots: 4,
      powerStatus: "Active",
      activeStatus: "Inactive",
      sugarLevel: 60,
      waterLevel: 75,
      address: "321 Elm St, Westside",
    },
    {
      id: "M005",
      machineId: "VM-005",
      registeredCompany: "ThirstQuench Co",
      slots: 12,
      powerStatus: "Inactive",
      activeStatus: "Active",
      sugarLevel: 30,
      waterLevel: 15,
      address: "654 Maple Dr, Eastend",
    },
    {
      id: "M006",
      machineId: "VM-006",
      registeredCompany: "Refresh Inc",
      slots: 8,
      powerStatus: "Active",
      activeStatus: "Active",
      sugarLevel: 88,
      waterLevel: 92,
      address: "987 Cedar Ln, Northside",
    },
    {
      id: "M007",
      machineId: "VM-007",
      registeredCompany: "QuickDrink Ltd",
      slots: 6,
      powerStatus: "Active",
      activeStatus: "Inactive",
      sugarLevel: 70,
      waterLevel: 85,
      address: "147 Birch St, Southside",
    },
    {
      id: "M008",
      machineId: "VM-008",
      registeredCompany: "Beverage Corp",
      slots: 10,
      powerStatus: "Inactive",
      activeStatus: "Inactive",
      sugarLevel: 25,
      waterLevel: 40,
      address: "258 Spruce Ave, Central",
    },
  ];

  // Machine content data - generated based on machine slots
  machineContentData: { [key: string]: MachineContent[] } = {};

  // Currently displayed content
  currentMachineContent: MachineContent[] = [];

  // Edit Modal Properties
  isEditModalOpen = false;
  editingContent: MachineContent | null = null;

  // Form model for editing
  editForm = {
    beverage: "",
    availableCups: 0,
    waterPerCup: 0,
    powderPerCup: 0,
    mixingTime: 0,
    price: 0,
  };

  // Available beverages for dropdown
  beverageOptions: Option[] = [
    { value: "Coffee", label: "Coffee" },
    { value: "Tea", label: "Tea" },
    { value: "Hot Chocolate", label: "Hot Chocolate" },
    { value: "Cappuccino", label: "Cappuccino" },
    { value: "Latte", label: "Latte" },
    { value: "Espresso", label: "Espresso" },
    { value: "Green Tea", label: "Green Tea" },
    { value: "Black Tea", label: "Black Tea" },
    { value: "Milk Coffee", label: "Milk Coffee" },
    { value: "Americano", label: "Americano" },
    { value: "Mocha", label: "Mocha" },
    { value: "Macchiato", label: "Macchiato" },
  ];

  ngOnInit() {
    // Initialize machine options
    this.machineOptions = this.machines.map((machine) => ({
      value: machine.machineId,
      label: machine.machineId,
    }));

    // Generate content data for all machines
    this.generateMachineContentData();
  }

  generateMachineContentData() {
    this.machines.forEach((machine) => {
      const content: MachineContent[] = [];

      for (let i = 1; i <= machine.slots; i++) {
        const randomBeverage =
          this.beverageOptions[
            Math.floor(Math.random() * this.beverageOptions.length)
          ];

        content.push({
          id: `${machine.machineId}-S${i.toString().padStart(2, "0")}`,
          slotNumber: i,
          beverage: randomBeverage.label,
          availableCups: Math.floor(Math.random() * 50) + 10, // 10-60 cups
          waterPerCup: Math.floor(Math.random() * 100) + 150, // 150-250ml
          powderPerCup: Math.floor(Math.random() * 10) + 5, // 5-15 grams
          mixingTime: Math.floor(Math.random() * 10) + 20, // 20-30 seconds
          price: parseFloat((Math.random() * 3 + 1).toFixed(2)), // $1.00 - $4.00
        });
      }

      this.machineContentData[machine.machineId] = content;
    });
  }

  onMachineSelect(value: string) {
    this.selectedMachineId = value;
  }

  searchMachineContent() {
    if (this.selectedMachineId) {
      this.currentMachineContent =
        this.machineContentData[this.selectedMachineId] || [];
    } else {
      this.currentMachineContent = [];
    }
  }

  // Individual change handlers that accept string | number
  onBeverageChange(value: string) {
    this.editForm.beverage = value;
  }

  onAvailableCupsChange(value: string | number) {
    const numValue =
      typeof value === "string" ? parseInt(value, 10) || 0 : value;
    this.editForm.availableCups = numValue;
  }

  onPriceChange(value: string | number) {
    const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    this.editForm.price = numValue;
  }

  onWaterPerCupChange(value: string | number) {
    const numValue =
      typeof value === "string" ? parseInt(value, 10) || 0 : value;
    this.editForm.waterPerCup = numValue;
  }

  onPowderPerCupChange(value: string | number) {
    const numValue =
      typeof value === "string" ? parseInt(value, 10) || 0 : value;
    this.editForm.powderPerCup = numValue;
  }

  onMixingTimeChange(value: string | number) {
    const numValue =
      typeof value === "string" ? parseInt(value, 10) || 0 : value;
    this.editForm.mixingTime = numValue;
  }

  // Form validation
  isFormValid(): boolean {
    return (
      !!this.editForm.beverage &&
      this.editForm.availableCups >= 0 &&
      this.editForm.price >= 0 &&
      this.editForm.waterPerCup > 0 &&
      this.editForm.powderPerCup > 0 &&
      this.editForm.mixingTime > 0
    );
  }

  // Also update the editContent method to ensure proper initialization:
  editContent(content: MachineContent) {
    this.editingContent = { ...content };
    this.editForm = {
      beverage: content.beverage,
      availableCups: content.availableCups,
      waterPerCup: content.waterPerCup,
      powderPerCup: content.powderPerCup,
      mixingTime: content.mixingTime,
      price: content.price,
    };
    this.isEditModalOpen = true;
  }

  // Save edited content
  saveContent() {
    if (this.editingContent) {
      // Update the content in current display
      const index = this.currentMachineContent.findIndex(
        (item) => item.id === this.editingContent!.id
      );
      if (index !== -1) {
        this.currentMachineContent[index] = {
          ...this.currentMachineContent[index],
          beverage: this.editForm.beverage,
          availableCups: this.editForm.availableCups,
          waterPerCup: this.editForm.waterPerCup,
          powderPerCup: this.editForm.powderPerCup,
          mixingTime: this.editForm.mixingTime,
          price: this.editForm.price,
        };
      }

      // Update the main data store
      if (
        this.selectedMachineId &&
        this.machineContentData[this.selectedMachineId]
      ) {
        const mainIndex = this.machineContentData[
          this.selectedMachineId
        ].findIndex((item) => item.id === this.editingContent!.id);
        if (mainIndex !== -1) {
          this.machineContentData[this.selectedMachineId][mainIndex] = {
            ...this.machineContentData[this.selectedMachineId][mainIndex],
            beverage: this.editForm.beverage,
            availableCups: this.editForm.availableCups,
            waterPerCup: this.editForm.waterPerCup,
            powderPerCup: this.editForm.powderPerCup,
            mixingTime: this.editForm.mixingTime,
            price: this.editForm.price,
          };
        }
      }

      console.log("Content updated:", this.currentMachineContent[index]);
      this.closeEditModal();
    }
  }

  // Close edit modal
  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingContent = null;
    this.editForm = {
      beverage: "",
      availableCups: 0,
      waterPerCup: 0,
      powderPerCup: 0,
      mixingTime: 0,
      price: 0,
    };
  }

  // Get current machine info for display
  getCurrentMachineInfo() {
    if (!this.selectedMachineId) return null;
    return this.machines.find((m) => m.machineId === this.selectedMachineId);
  }
}
