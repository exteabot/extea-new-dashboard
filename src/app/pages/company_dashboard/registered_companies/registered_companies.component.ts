import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { RegisteredCompaniesTableComponent } from '../../../shared/components/active_tables/registered_companies_details/registered_companies_details.component';

@Component({
    selector: 'app-registered-companies',
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        RegisteredCompaniesTableComponent
    ],
      templateUrl: './registered_companies.component.html',
      styles: ``
})

export class RegisteredCompaniesComponent {

}