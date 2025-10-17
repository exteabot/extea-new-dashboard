import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonComponent } from "../../ui/button/button.component";
import { TableDropdownComponent } from "../../common/table-dropdown/table-dropdown.component";
import { BadgeComponent } from "../../ui/badge/badge.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { SelectComponent, Option } from "../../form/select/select.component";
import { ModalComponent } from "../../ui/modal/modal.component";

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
  selector: "app-machines-table",
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
    InputFieldComponent,
    SelectComponent,
    ModalComponent,
  ],
  templateUrl: "./machine_details.component.html",
  styles: ``,
})
export class MachinesTableComponent {
  updateMachineId(value: string | number) {
    this.filterForm.machineId = value.toString();
  }

  updateCompanyName(value: string | number) {
    this.filterForm.companyName = value.toString();
  }

  updateLocation(value: string | number) {
    this.filterForm.location = value.toString();
  }

  // Filter form values
  filterForm = {
    machineId: "",
    companyName: "",
    location: "",
    powerStatus: "All",
    activeStatus: "All",
  };

  // Power Status options
  powerStatusOptions: Option[] = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  // Active Status options
  activeStatusOptions: Option[] = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  // Original data
  originalMachineData: Machine[] = [
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

  // Edit Modal Properties
  isEditModalOpen = false;
  editingMachine: Machine | null = null;

  // Form model for editing
  editForm = {
    machineId: "",
    slots: 0,
    registeredCompany: "",
    location: "",
  };

  // Available companies for dropdown
  companyOptions: Option[] = [
    { value: "Beverage Corp", label: "Beverage Corp" },
    { value: "Refresh Inc", label: "Refresh Inc" },
    { value: "QuickDrink Ltd", label: "QuickDrink Ltd" },
    { value: "ThirstQuench Co", label: "ThirstQuench Co" },
  ];

  // Filtered data
  machineData: Machine[] = [...this.originalMachineData];

  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.machineData.length / this.itemsPerPage);
  }

  get currentItems(): Machine[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.machineData.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Apply filters
  applyFilters() {
    this.machineData = this.originalMachineData.filter((machine) => {
      const matchesMachineId =
        !this.filterForm.machineId ||
        machine.machineId
          .toLowerCase()
          .includes(this.filterForm.machineId.toLowerCase());

      const matchesCompany =
        !this.filterForm.companyName ||
        machine.registeredCompany
          .toLowerCase()
          .includes(this.filterForm.companyName.toLowerCase());

      const matchesLocation =
        !this.filterForm.location ||
        machine.address
          .toLowerCase()
          .includes(this.filterForm.location.toLowerCase());

      const matchesPowerStatus =
        this.filterForm.powerStatus === "All" ||
        machine.powerStatus === this.filterForm.powerStatus;

      const matchesActiveStatus =
        this.filterForm.activeStatus === "All" ||
        machine.activeStatus === this.filterForm.activeStatus;

      return (
        matchesMachineId &&
        matchesCompany &&
        matchesLocation &&
        matchesPowerStatus &&
        matchesActiveStatus
      );
    });

    this.currentPage = 1; // Reset to first page after filtering
  }

  // Reset filters
  resetFilters() {
    this.filterForm = {
      machineId: "",
      companyName: "",
      location: "",
      powerStatus: "All",
      activeStatus: "All",
    };
    this.machineData = [...this.originalMachineData];
    this.currentPage = 1;
  }

  togglePowerStatus(machine: Machine) {
    machine.powerStatus =
      machine.powerStatus === "Active" ? "Inactive" : "Active";
    console.log(
      "Toggled power status for:",
      machine.machineId,
      "New status:",
      machine.powerStatus
    );
  }

  toggleActiveStatus(machine: Machine) {
    machine.activeStatus =
      machine.activeStatus === "Active" ? "Inactive" : "Active";
    console.log(
      "Toggled active status for:",
      machine.machineId,
      "New status:",
      machine.activeStatus
    );
  }

  // Edit Machine Method - Updated to open modal
  editMachine(machine: Machine) {
    this.editingMachine = { ...machine };
    this.editForm = {
      machineId: machine.machineId,
      slots: machine.slots,
      registeredCompany: machine.registeredCompany,
      location: machine.address,
    };
    this.isEditModalOpen = true;
  }

  // Save edited machine
  saveMachine() {
    if (this.editingMachine) {
      // Update the machine data
      const index = this.originalMachineData.findIndex(
        (m) => m.id === this.editingMachine!.id
      );
      if (index !== -1) {
        this.originalMachineData[index] = {
          ...this.originalMachineData[index],
          machineId: this.editForm.machineId,
          slots: this.editForm.slots,
          registeredCompany: this.editForm.registeredCompany,
          address: this.editForm.location,
        };
      }

      // Update the filtered data as well
      const filteredIndex = this.machineData.findIndex(
        (m) => m.id === this.editingMachine!.id
      );
      if (filteredIndex !== -1) {
        this.machineData[filteredIndex] = {
          ...this.machineData[filteredIndex],
          machineId: this.editForm.machineId,
          slots: this.editForm.slots,
          registeredCompany: this.editForm.registeredCompany,
          address: this.editForm.location,
        };
      }

      console.log("Machine updated:", this.originalMachineData[index]);
      this.closeEditModal();
    }
  }

  // Close edit modal
  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingMachine = null;
    this.editForm = {
      machineId: "",
      slots: 0,
      registeredCompany: "",
      location: "",
    };
  }

  getStatusBadgeColor(status: string): "success" | "error" {
    return status === "Active" ? "success" : "error";
  }

  getLevelColor(level: number): string {
    if (level >= 80) return "text-green-600 dark:text-green-400";
    if (level >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  }
}
