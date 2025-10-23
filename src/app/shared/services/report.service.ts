import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ReportData {
  title: string;
  generatedAt: Date;
  filters: any;
  totalItems: number;
  items: any[];
  summary?: any;
  columns: ReportColumn[];
}

export interface ReportColumn {
  key: string;
  label: string;
  type?: "text" | "number" | "status" | "badge" | "level";
  format?: (value: any) => string;
}

export interface ReportConfig {
  title: string;
  filters: any;
  items: any[];
  columns: ReportColumn[];
  summary?: any;
}

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private reportData = new BehaviorSubject<ReportData | null>(null);
  public reportData$ = this.reportData.asObservable();

  generateReport(config: ReportConfig): void {
    const reportData: ReportData = {
      title: config.title,
      generatedAt: new Date(),
      filters: config.filters,
      totalItems: config.items.length,
      items: config.items,
      summary: config.summary,
      columns: config.columns,
    };

    this.reportData.next(reportData);
  }

  clearReport(): void {
    this.reportData.next(null);
  }

  exportAsPDF(reportData: ReportData): void {
    if (!reportData) {
      console.error("No report data to export");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      console.error("Could not open print window");
      return;
    }

    const reportHTML = this.generateReportHTML(reportData);

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${reportData.title}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            color: #333;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #333; 
            padding-bottom: 20px; 
            margin-bottom: 30px;
          }
          .filters-section, .summary-section { 
            margin: 20px 0; 
            padding: 15px; 
            background: #f9f9f9; 
            border-radius: 5px;
          }
          .filters-grid, .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 10px;
          }
          .filter-item, .summary-item {
            padding: 8px;
            background: white;
            border-radius: 3px;
            border-left: 4px solid #007bff;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
          }
          .badge-active { background: #d4edda; color: #155724; }
          .badge-inactive { background: #f8d7da; color: #721c24; }
          .level-high { color: #28a745; }
          .level-medium { color: #ffc107; }
          .level-low { color: #dc3545; }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .no-data {
            text-align: center;
            padding: 40px;
            color: #666;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        ${reportHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  }

  private generateReportHTML(reportData: ReportData): string {
    const { title, generatedAt, filters, totalItems, items, summary, columns } =
      reportData;

    return `
      <div class="header">
        <h1>${title}</h1>
        <p>Generated on: ${generatedAt.toLocaleString()}</p>
        <p>Total Items: ${totalItems}</p>
      </div>

      ${
        filters
          ? `
      <div class="filters-section">
        <h3>Applied Filters</h3>
        <div class="filters-grid">
          ${Object.entries(filters)
            .map(
              ([key, value]) => `
            <div class="filter-item">
              <strong>${this.formatFilterKey(key)}:</strong> ${value || "All"}
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      `
          : ""
      }

      ${
        summary
          ? `
      <div class="summary-section">
        <h3>Summary</h3>
        <div class="summary-grid">
          ${Object.entries(summary)
            .map(
              ([key, value]) => `
            <div class="summary-item">
              <strong>${this.formatSummaryKey(key)}:</strong> ${value}
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      `
          : ""
      }

      <h3>Detailed Data</h3>
      <table>
        <thead>
          <tr>
            ${columns.map((col) => `<th>${col.label}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr>
              ${columns
                .map(
                  (col) => `
                <td class="${this.getCellClass(item[col.key], col.type)}">
                  ${this.formatCellValue(item[col.key], col)}
                </td>
              `
                )
                .join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="footer">
        <p>Report generated by Management System</p>
      </div>
    `;
  }

  private formatFilterKey(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  private formatSummaryKey(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  private formatCellValue(value: any, column: ReportColumn): string {
    if (column.format) {
      return column.format(value);
    }

    if (column.type === "badge" || column.type === "status") {
      return `<span class="badge ${
        value === "Active" ? "badge-active" : "badge-inactive"
      }">${value}</span>`;
    }

    if (column.type === "level") {
      const level = parseInt(value);
      const levelClass =
        level >= 80 ? "level-high" : level >= 50 ? "level-medium" : "level-low";
      return `<span class="${levelClass}">${value}%</span>`;
    }

    return value;
  }

  private getCellClass(value: any, type?: string): string {
    if (type === "level") {
      const level = parseInt(value);
      if (level >= 80) return "level-high";
      if (level >= 50) return "level-medium";
      return "level-low";
    }
    return "";
  }
}
