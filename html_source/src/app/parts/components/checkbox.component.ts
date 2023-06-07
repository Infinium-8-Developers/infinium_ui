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
  selector: 'app-checkbox',
  template: `
    <div class="checkbox">
      <input
        (change)="handlerChange($event)"
        [checked]="value"
        [disabled]="disabled"
        [id]="id"
        [readonly]="readonly"
        type="checkbox"
      />
      <label [for]="id">{{ label }}</label>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() value = false;

  @Input() label = '';

  @Input() id = 'id-' + Math.random();

  @Input() disabled = false;

  @Input() readonly = false;

  @Output() emitChange = new EventEmitter<boolean>();

  onChange!: (value: boolean) => void;

  onTouched!: () => void;

  handlerChange({ target }: Event): void {
    const { checked } = target as HTMLInputElement;
    this.value = checked;
    this.emitChange.emit(checked);
    if (this.onChange) {
      this.onChange(checked);
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
