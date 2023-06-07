import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-switch',
  template: `
    <div
      (click)="toggle(); $event.stopPropagation()"
      [class.disabled]="disabled"
      [class.off]="!value"
      [class.on]="value"
      class="switch"
    >
      <span class="circle"></span>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() value = false;

  @Input() disabled = false;

  @Output() emitChange = new EventEmitter<boolean>();

  onTouched!: () => void;

  onChange!: (value: boolean) => void;

  toggle(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.emitChange.emit(this.value);
      if (this.onChange) {
        this.onChange(this.value);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }
}
