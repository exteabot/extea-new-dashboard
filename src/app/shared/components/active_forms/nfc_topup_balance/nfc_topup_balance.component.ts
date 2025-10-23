import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../common/component-card/component-card.component'; 
import { InputFieldComponent } from '../../form/input/input-field.component'; 
import { LabelComponent } from '../../form/label/label.component'; 
import { ButtonComponent } from '../../ui/button/button.component'; 

// Mock service - replace with actual API service
interface NfcAccount {
  id: string;
  balance: number;
}

@Component({
  selector: 'app-nfc-balance-topup-form', // This should match what you use in template
  standalone: true,
  imports: [
    CommonModule,
    ComponentCardComponent,
    InputFieldComponent,
    LabelComponent,
    ButtonComponent
  ],
  templateUrl: './nfc_topup_balance.component.html',
})
export class NfcBalanceTopupComponent { // Renamed for clarity
  nfcSystemId: string = '';
  topUpAmount: number = 0;
  currentBalance: number | null = null;
  nfcError: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  // Mock data - replace with actual API calls
  private nfcAccounts: NfcAccount[] = [
    { id: 'NFC001', balance: 25.50 },
    { id: 'NFC002', balance: 10.00 },
    { id: 'NFC003', balance: 100.75 }
  ];

  checkBalance() {
    this.clearMessages();
    
    const account = this.nfcAccounts.find(acc => acc.id === this.nfcSystemId);
    
    if (account) {
      this.currentBalance = account.balance;
      this.nfcError = false;
      this.showMessage(`Balance retrieved successfully for ${this.nfcSystemId}`, 'success');
    } else {
      this.currentBalance = null;
      this.nfcError = true;
      this.showMessage('NFC System ID not found. Please check the entered code.', 'error');
    }
  }

  topUpBalance() {
    this.clearMessages();
    
    if (confirm(`Are you sure you want to top up $${this.topUpAmount} to NFC ID: ${this.nfcSystemId}?`)) {
      const account = this.nfcAccounts.find(acc => acc.id === this.nfcSystemId);
      
      if (account) {
        // Update balance (in real app, this would be an API call)
        account.balance += this.topUpAmount;
        this.currentBalance = account.balance;
        this.nfcError = false;
        this.showMessage(`Successfully topped up $${this.topUpAmount} to ${this.nfcSystemId}. New balance: $${account.balance.toFixed(2)}`, 'success');
        
        // Reset top-up amount after successful top-up
        this.topUpAmount = 0;
      } else {
        this.nfcError = true;
        this.showMessage('NFC System ID not found. Please check the entered code.', 'error');
      }
    }
  }

  private showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
  }

  private clearMessages() {
    this.message = '';
    this.nfcError = false;
  }
}