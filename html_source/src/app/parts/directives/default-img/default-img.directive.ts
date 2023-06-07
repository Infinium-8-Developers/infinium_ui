import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDefaultImg]',
})
export class DefaultImgDirective {
  @Input() defaultImgSrc!: string | null | undefined;
  @Input() defaultImgAlt: string | null | undefined;

  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  handlerOnError(): void {
    const elementImg: HTMLImageElement = <HTMLImageElement>(
      this.elementRef.nativeElement
    );
    elementImg.onerror = null;
    elementImg.src = this.defaultImgSrc || '---';
    elementImg.alt = this.defaultImgAlt || '---';
  }
}
