import { Directive, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: 'input',
})
export class InputDisableSelectionDirective {
  @HostListener('mousedown', ['$event'])
  handleInput(event: Event): void {
    if ((<HTMLInputElement>event.target).readOnly) {
      event.preventDefault();
    }
  }
}
