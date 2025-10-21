import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BeveragesTableComponent } from "../../../shared/components/active_tables/registered_beverages_details/registered_beverages_details.component";

@Component({
    selector: 'app-manage-beverage',
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        BeveragesTableComponent,
    ],
    templateUrl: './manage_beverages.component.html',
    styles: ``
})

export class ManageBeveragesComponent {

}