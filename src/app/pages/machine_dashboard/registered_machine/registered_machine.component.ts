import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { MachinesTableComponent } from '../../../shared/components/active_tables/machine_details/machine_details.component';

@Component({
    selector: 'app-registered-machine',
    standalone: true,
    imports: [
        CommonModule,
        PageBreadcrumbComponent,
        MachinesTableComponent
    ],
      templateUrl: './registered_machine.component.html',
      styles: ``
})

export class RegisteredMachineComponent {

}