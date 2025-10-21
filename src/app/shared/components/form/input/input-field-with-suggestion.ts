import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-input-field-with-suggestions",
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="relative" #container>
      <input
        [type]="type"
        [id]="id"
        [name]="name"
        [placeholder]="placeholder"
        [value]="value"
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        [ngClass]="inputClasses"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />

      <!-- Suggestions dropdown -->
      @if (showSuggestions && filteredSuggestions.length > 0) {
      <div
        class="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 max-h-60 overflow-y-auto"
      >
        @for (suggestion of filteredSuggestions; track suggestion) {
        <button
          type="button"
          (mousedown)="selectSuggestion(suggestion)"
          class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
        >
          {{ suggestion }}
        </button>
        }
      </div>
      } @if (hint) {
      <p
        class="mt-1.5 text-xs"
        [ngClass]="{
          'text-error-500': error,
          'text-success-500': success,
          'text-gray-500': !error && !success
        }"
      >
        {{ hint }}
      </p>
      }
    </div>
  `,
})
export class InputFieldWithSuggestionsComponent {
  @Input() type: string = "text";
  @Input() id?: string = "";
  @Input() name?: string = "";
  @Input() placeholder?: string = "";
  @Input() value: string | number = "";
  @Input() min?: string;
  @Input() max?: string;
  @Input() step?: number;
  @Input() disabled: boolean = false;
  @Input() success: boolean = false;
  @Input() error: boolean = false;
  @Input() hint?: string;
  @Input() className: string = "";
  @Input() suggestions: string[] = [];

  @Output() valueChange = new EventEmitter<string | number>();

  showSuggestions = false;
  filteredSuggestions: string[] = [];

  get inputClasses(): string {
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${this.className}`;

    if (this.disabled) {
      inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
    } else if (this.error) {
      inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
    } else if (this.success) {
      inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
    } else {
      inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
    }
    return inputClasses;
  }

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    this.filterSuggestions();
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = this.type === "number" ? +input.value : input.value;
    this.valueChange.emit(newValue);
    this.filterSuggestions();
    this.showSuggestions = true;
  }

  onFocus() {
    this.filterSuggestions();
    this.showSuggestions = true;
  }

  onBlur() {
    // Use setTimeout to allow click event to register before hiding
    setTimeout(() => {
      this.showSuggestions = false;
    }, 150);
  }

  filterSuggestions() {
    const currentValue = this.value.toString().toLowerCase();
    if (!currentValue) {
      this.filteredSuggestions = [...this.suggestions];
    } else {
      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(currentValue)
      );
    }
  }

  selectSuggestion(suggestion: string) {
    this.valueChange.emit(suggestion);
    this.showSuggestions = false;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event) {
    // Close suggestions when clicking outside the component
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }
}
