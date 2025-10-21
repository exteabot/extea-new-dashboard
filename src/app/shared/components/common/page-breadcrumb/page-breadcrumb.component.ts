import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-page-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './page-breadcrumb.component.html',
  styles: ``
})
export class PageBreadcrumbComponent implements OnInit {
  @Input() pageTitle = '';
  breadcrumbItems: BreadcrumbItem[] = [];

  // Define the navigation structure to match the sidebar
  private navigationStructure = {
    '/': { main: 'Dashboard', sub: 'Ecommerce' },
    '/new_machine': { main: 'Machines', sub: 'New Machine' },
    '/registered_machine': { main: 'Machines', sub: 'Registered Machines' },
    '/machine_content': { main: 'Machines', sub: 'Machine Contents' },
    '/new_company': { main: 'Partner Companies', sub: 'New Machine' },
    '/registered_companies': { main: 'Partner Companies', sub: 'Registered Companies' },
    '/new_beverage': { main: 'Beverages', sub: 'New Beverage' },
    '/manage_beverages': { main: 'Beverages', sub: 'Manage Beverages' },
    '/beverage_sales': { main: 'Sales', sub: 'Manage Total Sales' },
    '/individual_beverage_sales': { main: 'Sales', sub: 'Manage Beverage Sales' },
    '/calendar': { main: 'Calendar', sub: '' },
    '/profile': { main: 'User Profile', sub: '' },
    '/form-elements': { main: 'Forms', sub: 'Form Elements' },
    '/basic-tables': { main: 'Tables', sub: 'Basic Tables' },
    '/blank': { main: 'Pages', sub: 'Blank Page' },
    '/invoice': { main: 'Pages', sub: 'Invoice' },
    '/line-chart': { main: 'Charts', sub: 'Line Chart' },
    '/bar-chart': { main: 'Charts', sub: 'Bar Chart' },
    '/alerts': { main: 'UI Elements', sub: 'Alerts' },
    '/avatars': { main: 'UI Elements', sub: 'Avatar' },
    '/badge': { main: 'UI Elements', sub: 'Badge' },
    '/buttons': { main: 'UI Elements', sub: 'Buttons' },
    '/images': { main: 'UI Elements', sub: 'Images' },
    '/videos': { main: 'UI Elements', sub: 'Videos' },
    '/signin': { main: 'Authentication', sub: 'Sign In' },
    '/signup': { main: 'Authentication', sub: 'Sign Up' }
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateBreadcrumb();
    
    // Update breadcrumb on route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumb();
      }
    });
  }

  private updateBreadcrumb() {
    const currentUrl = this.router.url;
    this.breadcrumbItems = [];
    
    // Always start with Home
    this.breadcrumbItems.push({ label: 'Home', url: '/' });
    
    // Get the navigation info for current route
    const navInfo = this.navigationStructure[currentUrl as keyof typeof this.navigationStructure];
    
    if (navInfo) {
      // Add main navigation item if it exists
      if (navInfo.main) {
        // For main items, we don't add a URL to make them non-clickable
        // or you could add navigation logic if desired
        this.breadcrumbItems.push({ label: navInfo.main });
      }
      
      // Add sub navigation item if it exists
      if (navInfo.sub) {
        this.breadcrumbItems.push({ label: navInfo.sub });
      }
    }
    
    // Always end with the current page title if provided
    if (this.pageTitle && (!navInfo?.sub || this.pageTitle !== navInfo.sub)) {
      this.breadcrumbItems.push({ label: this.pageTitle });
    }
  }

  // Helper method to check if it's the last breadcrumb item
  isLastItem(index: number): boolean {
    return index === this.breadcrumbItems.length - 1;
  }
}