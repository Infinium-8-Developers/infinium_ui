import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => this.elementRef.nativeElement.focus());
  }
}
