import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CompanyFormComponent, CompanyData } from "../../../shared/components/active_forms/new_company_register/new_company_register.component"; 

@Component({
    selector: 'app-new-company',
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        CompanyFormComponent
    ],
    templateUrl: './new_company.component.html',
    styles: ``
})

export class NewCompanyComponent {
    constructor(private router: Router) {}

    handleCompanySubmit(companyData: CompanyData) {
        console.log('Company Data Submitted:', companyData);
        // Here you would typically send the data to your backend service
        // For now, we'll just log it and navigate back
        alert('Company created successfully!');
        this.router.navigate(['/registered_companies']);
    }

    handleCompanyCancel() {
        console.log('Company creation cancelled');
        this.router.navigate(['/companies']);
    }
}