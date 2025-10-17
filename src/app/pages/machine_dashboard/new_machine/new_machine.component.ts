import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { MachineFormComponent, MachineData } from '../../../shared/components/active_forms/new_machine_register/new_machine_register.component';

@Component({
    selector: 'app-new-machine',
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        MachineFormComponent
    ],
    templateUrl: './new_machine.component.html',
    styles: ``
})
export class NewMachineComponent {
  
  constructor(private router: Router) {}

  onFormSubmit(machineData: MachineData) {
    console.log('Parent component received form data:', machineData);
    
    // Here you would typically send the data to a service
    // Example: this.machineService.addMachine(machineData).subscribe(...);
    
    // For now, simulate successful submission and navigate
    this.handleSuccessfulSubmission();
  }

  onFormCancel() {
    console.log('Form cancelled in parent component');
    // Navigate back to machines list or previous page
    this.router.navigate(['/registered_machine']);
  }

  private handleSuccessfulSubmission(): void {
    // Show success message
    alert('Machine added successfully!');
    
    // Navigate to registered machines page
    this.router.navigate(['/registered_machine']);
  }
}