import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LabelComponent } from "../../form/label/label.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { DropzoneComponent } from "../../form/form-elements/dropzone/dropzone.component";

export interface BeverageData {
  name: string;
  active: boolean;
  shortCode: string;
  describeCode: string;
  description: string;
  image: File | null;
  costPrice: number | null;
  unitPrice: number | null;
}

@Component({
  selector: "app-new-beverage-form",
  imports: [
    CommonModule,
    FormsModule,
    LabelComponent,
    ButtonComponent,
    DropzoneComponent,
  ],
  templateUrl: "./new_beverage_register.component.html",
  styles: ``,
})
export class NewBeverageFormComponent {
  beverageData: BeverageData = {
    name: "",
    active: true,
    shortCode: "",
    describeCode: "",
    description: "",
    image: null,
    costPrice: null,
    unitPrice: null,
  };

  // Segmented price inputs
  costPriceWhole: string = "";
  costPriceDecimal: string = "";
  unitPriceWhole: string = "";
  unitPriceDecimal: string = "";

  @Output() formSubmit = new EventEmitter<BeverageData>();
  @Output() formCancel = new EventEmitter<void>();

  isFormValid(): boolean {
    return (
      !!this.beverageData.name?.trim() &&
      !!this.beverageData.shortCode?.trim() &&
      !!this.beverageData.describeCode?.trim() &&
      this.beverageData.costPrice !== null &&
      this.beverageData.costPrice >= 0 &&
      this.beverageData.unitPrice !== null &&
      this.beverageData.unitPrice >= 0
    );
  }

  onSubmit() {
    console.log("Submit button clicked");

    // Convert segmented prices to numbers before validation
    this.convertSegmentedPrices();

    // Basic validation
    if (!this.isFormValid()) {
      console.log("Form validation failed");
      alert("Please fill in all required fields with valid values.");
      return;
    }

    alert('New Beverage is Added');

    console.log("Form is valid, emitting data:", this.beverageData);
    this.formSubmit.emit(this.beverageData);
    this.resetForm();
  }

  onCancel() {
    console.log("Cancel button clicked");
    this.formCancel.emit();
    this.resetForm();
  }

  onFilesDropped(files: File[]) {
    if (files.length > 0) {
      this.beverageData.image = files[0];
    }
  }

  // Handle cost price changes from segmented inputs
  onCostPriceChange() {
    const whole = this.costPriceWhole ? parseInt(this.costPriceWhole) : 0;
    const decimal = this.costPriceDecimal ? parseInt(this.costPriceDecimal) : 0;

    if (!isNaN(whole) && !isNaN(decimal)) {
      this.beverageData.costPrice = whole + decimal / 100;
    } else {
      this.beverageData.costPrice = null;
    }
  }

  // Handle unit price changes from segmented inputs
  onUnitPriceChange() {
    const whole = this.unitPriceWhole ? parseInt(this.unitPriceWhole) : 0;
    const decimal = this.unitPriceDecimal ? parseInt(this.unitPriceDecimal) : 0;

    if (!isNaN(whole) && !isNaN(decimal)) {
      this.beverageData.unitPrice = whole + decimal / 100;
    } else {
      this.beverageData.unitPrice = null;
    }
  }

  // Convert segmented prices to numbers
  private convertSegmentedPrices() {
    // Cost Price
    const costWhole = this.costPriceWhole ? parseInt(this.costPriceWhole) : 0;
    const costDecimal = this.costPriceDecimal
      ? parseInt(this.costPriceDecimal)
      : 0;
    if (!isNaN(costWhole) && !isNaN(costDecimal)) {
      this.beverageData.costPrice = costWhole + costDecimal / 100;
    }

    // Unit Price
    const unitWhole = this.unitPriceWhole ? parseInt(this.unitPriceWhole) : 0;
    const unitDecimal = this.unitPriceDecimal
      ? parseInt(this.unitPriceDecimal)
      : 0;
    if (!isNaN(unitWhole) && !isNaN(unitDecimal)) {
      this.beverageData.unitPrice = unitWhole + unitDecimal / 100;
    }
  }

  private resetForm() {
    this.beverageData = {
      name: "",
      active: true,
      shortCode: "",
      describeCode: "",
      description: "",
      image: null,
      costPrice: null,
      unitPrice: null,
    };
    this.costPriceWhole = "";
    this.costPriceDecimal = "";
    this.unitPriceWhole = "";
    this.unitPriceDecimal = "";
  }
}
