import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { LabelComponent } from '../label/label.component';
import "flatpickr/dist/flatpickr.css";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule,LabelComponent],
  templateUrl: './date-picker.component.html',
  styles: ``
})
export class DatePickerComponent {

  @Input() id!: string;
  @Input() mode: 'single' | 'multiple' | 'range' | 'time' = 'single';
  @Input() defaultDate?: string | Date | string[] | Date[];
  @Input() label?: string;
  @Input() placeholder?: string;
  @Output() dateChange = new EventEmitter<any>();

  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef<HTMLInputElement>;

  private flatpickrInstance: flatpickr.Instance | undefined;

  ngAfterViewInit() {
    this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
      mode: this.mode,
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'Y-m-d',
      defaultDate: this.defaultDate,
      onChange: (selectedDates, dateStr, instance) => {
        this.dateChange.emit({ selectedDates, dateStr, instance });
      }
    });
  }

  // Method to reset the date picker to default or clear it
  resetToDefault(defaultDate?: string | Date | string[] | Date[]) {
    if (this.flatpickrInstance) {
      if (defaultDate) {
        // Set to provided default date
        this.flatpickrInstance.setDate(defaultDate, true);
      } else {
        // Clear the date picker
        this.flatpickrInstance.clear();
      }
      
      // Emit change event with empty values
      this.dateChange.emit({ 
        selectedDates: [], 
        dateStr: '', 
        instance: this.flatpickrInstance 
      });
    }
  }

  // Method to set a specific date
  setDate(date: string | Date | string[] | Date[]) {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.setDate(date, true);
    }
  }

  // Method to clear the date picker
  clear() {
    this.resetToDefault();
  }

  ngOnDestroy() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }
}