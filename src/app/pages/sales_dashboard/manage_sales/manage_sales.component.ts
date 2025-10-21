import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TotalSalesTableComponent } from '../../../shared/components/active_tables/manage_sales_details/manage_sales_details.component';

@Component({
    selector: 'app-beverage-sales',
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        TotalSalesTableComponent
    ],
      templateUrl: './manage_sales.component.html',
      styles: ``
})

export class BeverageSalesComponent {

}