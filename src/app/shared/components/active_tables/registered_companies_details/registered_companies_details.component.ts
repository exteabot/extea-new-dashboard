import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { TableDropdownComponent } from '../../common/table-dropdown/table-dropdown.component'; 
import { BadgeComponent } from '../../ui/badge/badge.component'; 
import { ModalComponent } from '../../ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { SelectComponent, Option } from '../../form/select/select.component';
import { ReportService, ReportColumn } from '../../../services/report.service';
import { ReportViewerComponent } from '../../reports/report.component'; 

interface Company {
  id: string;
  companyName: string;
  address: string;
  telephoneNumber: string;
  contactPerson: string;
  addedDate: Date;
  isActive: boolean;
}

@Component({
  selector: 'app-registered-companies-content-table',
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
    ModalComponent,
    FormsModule,
    InputFieldComponent,
    SelectComponent,
    ReportViewerComponent, // Add report component
  ],
  templateUrl: './registered_companies_details.component.html',
  styles: ``
})
export class RegisteredCompaniesTableComponent {

  // Filter form values
  filterForm = {
    companyName: '',
    telephone: '',
    address: '',
    status: 'All'
  };

  // Report Modal Properties
  isReportModalOpen = false;

  // Status options
  statusOptions: Option[] = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  // Original data
  originalCompaniesData: Company[] = [
    {
      id: 'COMP001',
      companyName: 'Tech Solutions Inc.',
      address: '123 Main Street, New York, NY 10001',
      telephoneNumber: '+1 (555) 123-4567',
      contactPerson: 'John Smith',
      addedDate: new Date('2024-01-15'),
      isActive: true
    },
    {
      id: 'COMP002',
      companyName: 'Global Innovations Ltd.',
      address: '456 Oak Avenue, Los Angeles, CA 90210',
      telephoneNumber: '+1 (555) 234-5678',
      contactPerson: 'Sarah Johnson',
      addedDate: new Date('2024-02-20'),
      isActive: true
    },
    {
      id: 'COMP003',
      companyName: 'Premium Services Co.',
      address: '789 Pine Road, Chicago, IL 60601',
      telephoneNumber: '+1 (555) 345-6789',
      contactPerson: 'Michael Brown',
      addedDate: new Date('2024-03-10'),
      isActive: false
    },
    {
      id: 'COMP004',
      companyName: 'Elite Manufacturing Corp.',
      address: '321 Elm Street, Houston, TX 77001',
      telephoneNumber: '+1 (555) 456-7890',
      contactPerson: 'Emily Davis',
      addedDate: new Date('2024-01-28'),
      isActive: true
    },
    {
      id: 'COMP005',
      companyName: 'Quality Products LLC',
      address: '654 Maple Drive, Phoenix, AZ 85001',
      telephoneNumber: '+1 (555) 567-8901',
      contactPerson: 'Robert Wilson',
      addedDate: new Date('2024-04-05'),
      isActive: false
    },
    {
      id: 'COMP006',
      companyName: 'Strategic Partners Inc.',
      address: '987 Cedar Lane, Philadelphia, PA 19101',
      telephoneNumber: '+1 (555) 678-9012',
      contactPerson: 'Jennifer Miller',
      addedDate: new Date('2024-02-14'),
      isActive: true
    },
    {
      id: 'COMP007',
      companyName: 'Advanced Systems Group',
      address: '147 Walnut Street, San Antonio, TX 78201',
      telephoneNumber: '+1 (555) 789-0123',
      contactPerson: 'David Taylor',
      addedDate: new Date('2024-03-22'),
      isActive: true
    },
    {
      id: 'COMP008',
      companyName: 'Innovation Labs',
      address: '258 Birch Avenue, San Diego, CA 92101',
      telephoneNumber: '+1 (555) 890-1234',
      contactPerson: 'Lisa Anderson',
      addedDate: new Date('2024-01-08'),
      isActive: false
    },
    {
      id: 'COMP009',
      companyName: 'Professional Services Co.',
      address: '369 Spruce Boulevard, Dallas, TX 75201',
      telephoneNumber: '+1 (555) 901-2345',
      contactPerson: 'James Martinez',
      addedDate: new Date('2024-04-12'),
      isActive: true
    },
    {
      id: 'COMP010',
      companyName: 'Enterprise Solutions Ltd.',
      address: '741 Oakwood Drive, San Jose, CA 95101',
      telephoneNumber: '+1 (555) 012-3456',
      contactPerson: 'Amanda White',
      addedDate: new Date('2024-02-28'),
      isActive: true
    }
  ];

  // Filtered data
  companiesData: Company[] = [...this.originalCompaniesData];

  currentPage = 1;
  itemsPerPage = 5;
  isEditModalOpen = false;
  selectedCompany: Company | null = null;
  editForm: Partial<Company> = {};

  constructor(private reportService: ReportService) {}

  // Generate Companies Report
  generateReport() {
    if (this.companiesData.length === 0) {
      console.warn('No companies data available for report');
      return;
    }

    // Calculate status distribution
    const statusDistribution = this.companiesData.reduce((acc, company) => {
      const status = company.isActive ? 'Active' : 'Inactive';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate registration timeline
    const currentYear = new Date().getFullYear();
    const registrationByMonth = this.companiesData.reduce((acc, company) => {
      const month = company.addedDate.toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const summary = {
      totalCompanies: this.companiesData.length,
      activeCompanies: statusDistribution['Active'] || 0,
      inactiveCompanies: statusDistribution['Inactive'] || 0,
      activePercentage: Math.round(((statusDistribution['Active'] || 0) / this.companiesData.length) * 100),
      averageRegistrationAge: this.getAverageRegistrationAge(),
      newestCompany: this.getNewestCompany(),
      oldestCompany: this.getOldestCompany(),
      mostCommonLocation: this.getMostCommonLocation()
    };

    const reportColumns: ReportColumn[] = [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'companyName', label: 'Company Name', type: 'text' },
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'telephoneNumber', label: 'Telephone', type: 'text' },
      { key: 'contactPerson', label: 'Contact Person', type: 'text' },
      { key: 'addedDate', label: 'Added Date', type: 'text', format: (value) => this.formatDate(value) },
      { key: 'isActive', label: 'Status', type: 'badge', format: (value) => value ? 'Active' : 'Inactive' }
    ];

    this.reportService.generateReport({
      title: 'Registered Companies Report',
      filters: { ...this.filterForm },
      items: [...this.companiesData],
      columns: reportColumns,
      summary: summary
    });

    this.isReportModalOpen = true;
  }

  // Helper method to calculate average registration age in months
  private getAverageRegistrationAge(): string {
    const now = new Date();
    const totalAge = this.companiesData.reduce((sum, company) => {
      const ageInMonths = (now.getTime() - company.addedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      return sum + ageInMonths;
    }, 0);
    
    const averageMonths = totalAge / this.companiesData.length;
    return `${averageMonths.toFixed(1)} months`;
  }

  // Helper method to get newest company
  private getNewestCompany(): string {
    const newest = this.companiesData.reduce((latest, company) => 
      company.addedDate > latest.addedDate ? company : latest
    );
    return `${newest.companyName} (${this.formatDate(newest.addedDate)})`;
  }

  // Helper method to get oldest company
  private getOldestCompany(): string {
    const oldest = this.companiesData.reduce((earliest, company) => 
      company.addedDate < earliest.addedDate ? company : earliest
    );
    return `${oldest.companyName} (${this.formatDate(oldest.addedDate)})`;
  }

  // Helper method to get most common location (city)
  private getMostCommonLocation(): string {
    const locationCount = this.companiesData.reduce((acc, company) => {
      // Extract city from address (simple extraction)
      const cityMatch = company.address.match(/,\s*([^,]+),\s*[A-Z]{2}/);
      if (cityMatch) {
        const city = cityMatch[1];
        acc[city] = (acc[city] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    const entries = Object.entries(locationCount);
    if (entries.length === 0) return 'N/A';
    
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return `${sorted[0][0]} (${sorted[0][1]} companies)`;
  }

  closeReportModal() {
    this.isReportModalOpen = false;
    this.reportService.clearReport();
  }

  get totalPages(): number {
    return Math.ceil(this.companiesData.length / this.itemsPerPage);
  }

  get currentItems(): Company[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.companiesData.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Apply filters
  applyFilters() {
    this.companiesData = this.originalCompaniesData.filter((company) => {
      const matchesCompanyName =
        !this.filterForm.companyName ||
        company.companyName
          .toLowerCase()
          .includes(this.filterForm.companyName.toLowerCase());

      const matchesTelephone =
        !this.filterForm.telephone ||
        company.telephoneNumber
          .toLowerCase()
          .includes(this.filterForm.telephone.toLowerCase());

      const matchesAddress =
        !this.filterForm.address ||
        company.address
          .toLowerCase()
          .includes(this.filterForm.address.toLowerCase());

      const matchesStatus =
        this.filterForm.status === 'All' ||
        (this.filterForm.status === 'Active' && company.isActive) ||
        (this.filterForm.status === 'Inactive' && !company.isActive);

      return (
        matchesCompanyName &&
        matchesTelephone &&
        matchesAddress &&
        matchesStatus
      );
    });

    this.currentPage = 1; // Reset to first page after filtering
  }

  // Reset filters
  resetFilters() {
    this.filterForm = {
      companyName: '',
      telephone: '',
      address: '',
      status: 'All'
    };
    this.companiesData = [...this.originalCompaniesData];
    this.currentPage = 1;
  }

  toggleActiveStatus(company: Company) {
    company.isActive = !company.isActive;
    console.log(`Company ${company.companyName} status changed to: ${company.isActive ? 'Active' : 'Inactive'}`);
  }

  editCompany(company: Company) {
    this.selectedCompany = company;
    this.editForm = {
      id: company.id,
      companyName: company.companyName,
      address: company.address,
      telephoneNumber: company.telephoneNumber,
      contactPerson: company.contactPerson
    };
    this.isEditModalOpen = true;
  }

  submitEdit() {
    if (this.selectedCompany && this.editForm) {
      // Update the company data
      const index = this.companiesData.findIndex(company => company.id === this.selectedCompany!.id);
      if (index !== -1) {
        this.companiesData[index] = {
          ...this.companiesData[index],
          companyName: this.editForm.companyName || '',
          address: this.editForm.address || '',
          telephoneNumber: this.editForm.telephoneNumber || '',
          contactPerson: this.editForm.contactPerson || ''
        };
      }
      
      // Also update the original data
      const originalIndex = this.originalCompaniesData.findIndex(company => company.id === this.selectedCompany!.id);
      if (originalIndex !== -1) {
        this.originalCompaniesData[originalIndex] = {
          ...this.originalCompaniesData[originalIndex],
          companyName: this.editForm.companyName || '',
          address: this.editForm.address || '',
          telephoneNumber: this.editForm.telephoneNumber || '',
          contactPerson: this.editForm.contactPerson || ''
        };
      }
      
      console.log('Company updated:', this.companiesData[index]);
      this.closeEditModal();
    }
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedCompany = null;
    this.editForm = {};
  }

  getStatusBadgeColor(isActive: boolean): 'success' | 'error' {
    return isActive ? 'success' : 'error';
  }

  getStatusText(isActive: boolean): string {
    return isActive ? 'Yes' : 'No';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
}