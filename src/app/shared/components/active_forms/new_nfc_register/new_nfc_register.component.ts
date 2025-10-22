import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentCardComponent } from '../../common/component-card/component-card.component';
import { InputFieldComponent } from '../../form/input/input-field.component'; 
import { LabelComponent } from '../../form/label/label.component'; 
import { CheckboxComponent } from '../../form/input/checkbox.component'; 
import { SelectComponent } from '../../form/select/select.component'; 
import { ButtonComponent } from '../../ui/button/button.component'; 

interface NfcData {
  nfcId: string;
  active: boolean;
  customerName: string;
  customerAddress: string;
  customerMobile: string;
  customerEmail: string;
  cardType: string;
  balance: number;
  currency: string;
}

@Component({
  selector: 'app-new-nfc-form',
  imports: [
    CommonModule,
    FormsModule,
    ComponentCardComponent,
    InputFieldComponent,
    LabelComponent,
    CheckboxComponent,
    SelectComponent,
    ButtonComponent
  ],
  templateUrl: './new_nfc_register.component.html',
  styles: ``
})
export class NewNfcFormComponent {
  nfcData: NfcData = {
    nfcId: '',
    active: true,
    customerName: '',
    customerAddress: '',
    customerMobile: '',
    customerEmail: '',
    cardType: '',
    balance: 0,
    currency: 'LKR'
  };

  emailError = false;

  cardTypeOptions = [
    { value: 'limited', label: 'Limited' },
    { value: 'unlimited', label: 'Unlimited' }
  ];

  currencyOptions = [
    { value: 'LKR', label: 'LKR' },
    { value: 'USD', label: 'USD' },
    { value: 'AUD', label: 'AUD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' }
  ];

  validateEmail(value: string | number): void {
    const email = value.toString();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailError = email !== '' && !emailRegex.test(email);
  }

  isFormValid(): boolean {
    return (
      this.nfcData.nfcId.trim() !== '' &&
      this.nfcData.customerName.trim() !== '' &&
      this.nfcData.customerAddress.trim() !== '' &&
      this.nfcData.customerMobile.trim() !== '' &&
      this.nfcData.customerEmail.trim() !== '' &&
      !this.emailError &&
      this.nfcData.cardType !== '' &&
      this.nfcData.balance !== null &&
      this.nfcData.balance >= 0
    );
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      // Here you would typically send the data to a service
      console.log('NFC Form Submitted:', this.nfcData);
      
      // Reset form after successful submission
      this.onCancel();
      
      // Show success message (you can implement a toast/notification here)
      alert('NFC card created successfully!');
    }
  }

  onCancel(): void {
    this.nfcData = {
      nfcId: '',
      active: true,
      customerName: '',
      customerAddress: '',
      customerMobile: '',
      customerEmail: '',
      cardType: '',
      balance: 0,
      currency: 'LKR'
    };
    this.emailError = false;
  }
}