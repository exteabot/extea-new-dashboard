import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { NewBeverageFormComponent, BeverageData } from "../../../shared/components/active_forms/new_beverage_register/new_beverage_register.component";

@Component({
    selector: 'app-new-beverage',
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        NewBeverageFormComponent
    ],
    templateUrl: './new_beverage.component.html',
    styles: ``
})
export class NewBeverageComponent {
    
    constructor(private router: Router) {}

    onFormSubmit(beverageData: BeverageData) {
        console.log('Beverage form submitted:', beverageData);
        // Handle form submission logic here
        // For example: call API service to save the beverage
        
        // After successful submission, you might want to navigate away
        this.router.navigate(['/manage_beverages']);
    }

    onFormCancel() {
        console.log('Beverage form cancelled');
        // Navigate back to beverages list or previous page
        this.router.navigate(['/manage_beverages']);
    }
}