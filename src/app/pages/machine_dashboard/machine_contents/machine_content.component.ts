import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { MachineContentDetailsComponent } from '../../../shared/components/active_tables/machines_content_details/machine_content_details.component';

@Component({
    selector: 'app-machine-content',
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        MachineContentDetailsComponent
    ],
      templateUrl: './machine_content.component.html',
      styles: ``
})

export class MachineContentComponent {

}