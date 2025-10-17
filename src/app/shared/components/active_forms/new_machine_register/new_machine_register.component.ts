import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../form/label/label.component'; 
import { InputFieldComponent } from '../../form/input/input-field.component'; 
import { CheckboxComponent } from '../../form/input/checkbox.component'; 
import { ButtonComponent } from '../../ui/button/button.component'; 

export interface MachineData {
  machineId: string;
  active: boolean;
  location: string;
  slots: number;
}

@Component({
  selector: 'app-machine-form',
  imports: [
    CommonModule,
    FormsModule,
    LabelComponent,
    InputFieldComponent,
    CheckboxComponent,
    ButtonComponent
  ],
  templateUrl: './new_machine_register.component.html',
  styles: ``
})
export class MachineFormComponent {
  @Output() formSubmit = new EventEmitter<MachineData>();
  @Output() formCancel = new EventEmitter<void>();

  machineData: MachineData = {
    machineId: '',
    active: false,
    location: '',
    slots: 0
  };

  isFormValid(): boolean {
    return this.machineData.machineId.trim() !== '' && 
           this.machineData.slots >= 0;
  }

  onSubmit(): void {
    console.log('Submit button clicked'); // Debug log
    console.log('Form valid:', this.isFormValid()); // Debug log
    console.log('Form data:', this.machineData); // Debug log
    
    if (this.isFormValid()) {
      console.log('Emitting form data'); // Debug log
      this.formSubmit.emit({ ...this.machineData });
    } else {
      console.log('Form is invalid'); // Debug log
    }
  }

  onCancel(): void {
    this.formCancel.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.machineData = {
      machineId: '',
      active: false,
      location: '',
      slots: 0
    };
  }
}