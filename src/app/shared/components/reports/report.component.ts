import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReportService,
  ReportData,
  ReportColumn,
} from "../../services/report.service";
import { ModalComponent } from "../ui/modal/modal.component";
import { ButtonComponent } from "../ui/button/button.component";
import { BadgeComponent } from "../ui/badge/badge.component";

@Component({
  selector: "app-report-viewer",
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent, BadgeComponent],
  templateUrl: "./report.component.html",
})
export class ReportViewerComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  reportData: ReportData | null = null;

  constructor(private reportService: ReportService) {
    this.reportService.reportData$.subscribe((data) => {
      this.reportData = data;
    });
  }

  onClose(): void {
    this.close.emit();
    this.reportService.clearReport();
  }

  exportAsPDF(): void {
    if (this.reportData) {
      this.reportService.exportAsPDF(this.reportData);
    }
  }

  // Helper method to get object entries for template
  objectEntries(obj: any): [string, any][] {
    if (!obj) return [];
    return Object.entries(obj);
  }

  // Helper method to format keys for display
  formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/([A-Z])/g, " $1")
      .trim();
  }

  getLevelColor(level: number): string {
    if (level >= 80) return "text-green-600 dark:text-green-400";
    if (level >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  }

  getStatusBadgeColor(status: string): "success" | "error" {
    return status === "Active" ? "success" : "error";
  }

  formatValue(value: any, column: ReportColumn): string {
    if (column.format) {
      return column.format(value);
    }
    return value;
  }

  // Safe accessor for template - summary
  get summaryEntries(): [string, any][] {
    return this.objectEntries(this.reportData?.summary || {});
  }

  // Safe accessor for template - filters
  get filterEntries(): [string, any][] {
    return this.objectEntries(this.reportData?.filters || {});
  }

  // Safe accessor for items with null check
  get safeItems(): any[] {
    return this.reportData?.items || [];
  }

  // Safe accessor for columns with null check
  get safeColumns(): ReportColumn[] {
    return this.reportData?.columns || [];
  }

  // Check if we have items to display
  get hasItems(): boolean {
    return this.safeItems.length > 0;
  }

  // Check if we have summary data
  get hasSummary(): boolean {
    return this.summaryEntries.length > 0;
  }

  // Check if we have filter data
  get hasFilters(): boolean {
    return this.filterEntries.length > 0;
  }
}
