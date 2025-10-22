import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ManageIndividualBeverageSalesComponent } from '../../../shared/components/active_tables/manage_individual_sales_details/manage_individual_sales_details.component';

@Component({
    selector: 'app-manage-individual-beverage-sales-page', 
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        ManageIndividualBeverageSalesComponent,
    ],
    templateUrl: './manage_individual_sales.component.html',
    styles: ``
})
export class IndividualBeverageSalesComponent {

}