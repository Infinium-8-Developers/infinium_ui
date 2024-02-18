import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    },
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @Input() value = false;

  @Input() label = '';

  @Input() id = 'id-' + Math.random();

  @Input() disabled = false;

  @Input() readonly = false;

  @Output() emitChange = new EventEmitter<boolean>();

  onChange = (_: boolean) => {
  }

  onTouched = () => {
  }

  constructor() {
  }

  ngOnInit() {
  }

  handlerChange({ target }: Event) {
    const { checked } = target as HTMLInputElement;
    this.value = checked;
    this.emitChange.emit(checked);
    this.onChange(checked);
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
