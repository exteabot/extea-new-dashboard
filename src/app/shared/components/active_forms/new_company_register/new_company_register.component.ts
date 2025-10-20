import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../form/label/label.component'; 
import { InputFieldComponent } from '../../form/input/input-field.component'; 
import { CheckboxComponent } from '../../form/input/checkbox.component'; 
import { ButtonComponent } from '../../ui/button/button.component'; 

export interface CompanyData {
  name: string;
  active: boolean;
  address: string;
  contactPerson: string;
  telephone: string;
}

@Component({
  selector: 'app-new-company-form',
  imports: [
    CommonModule,
    FormsModule,
    LabelComponent,
    InputFieldComponent,
    CheckboxComponent,
    ButtonComponent
  ],
  templateUrl: './new_company_register.component.html',
  styles: ``
})
export class CompanyFormComponent {
  companyData: CompanyData = {
    name: '',
    active: true,
    address: '',
    contactPerson: '',
    telephone: ''
  };

  @Output() formSubmit = new EventEmitter<CompanyData>();
  @Output() formCancel = new EventEmitter<void>();

  isFormValid(): boolean {
    return !!this.companyData.name.trim();
  }

  onSubmit() {
    // Basic validation
    if (!this.isFormValid()) {
      alert('Company name is required');
      return;
    }

    this.formSubmit.emit(this.companyData);
    this.resetForm();
  }

  onCancel() {
    this.formCancel.emit();
    this.resetForm();
  }

  private resetForm() {
    this.companyData = {
      name: '',
      active: true,
      address: '',
      contactPerson: '',
      telephone: ''
    };
  }
}