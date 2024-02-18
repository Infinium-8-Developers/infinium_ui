import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    },
  ]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {
  @Input() value = false;

  @Input() disabled = false;

  @Output() emitChange = new EventEmitter<boolean>();

  onChange = (_: boolean) => {
  }

  onTouched = () => {
  }

  constructor() {
  }

  ngOnInit() {
  }

  toggle() {
    if (!this.disabled) {
      this.value = !this.value;
      this.emitChange.emit(this.value);
      this.onChange(this.value);
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
