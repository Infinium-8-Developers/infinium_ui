import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const activeClass = 'scroll-item-active';

const scrollIntoViewOptions: ScrollIntoViewOptions = {
  behavior: 'smooth',
  inline: 'start',
};

enum Direction {
  left = 'left',
  right = 'right',
}

@Component({
  selector: 'app-scroll-x',
  template: `
    <div [class.visibility]="this.leftDisabled" class="left">
      <button
        (click)="$event.stopPropagation(); actionScroll(Direction.left)"
        class="btn-left"
      >
        <i class="icon arrow-left-slider"></i>
      </button>
    </div>
    <div
      #scrollMenu
      (mousedown)="$event.stopPropagation(); startDragging($event)"
      (mouseleave)="$event.stopPropagation(); stopDragging()"
      (mousemove)="$event.stopPropagation(); mouseMove($event)"
      (mouseup)="$event.stopPropagation(); stopDragging()"
      (scroll)="onScroll()"
      [class.hide-scroll]="hideScroll"
      [class.smooth]="scrollSmooth"
      class="scroll hide-scroll"
    >
      <div #scrollContent class="scroll-content scroll-delay">
        <ng-content></ng-content>
      </div>
    </div>
    <div [class.visibility]="this.rightDisabled" class="right">
      <button
        (click)="$event.stopPropagation(); actionScroll(Direction.right)"
        class="btn-right"
      >
        <i class="icon arrow-right-slider"></i>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        position: relative;
      }

      :host::ng-deep .scroll-content > * {
        margin-right: 2rem;
      }

      :host::ng-deep .scroll-content > *:last-child {
        margin-right: 0;
      }

      :host:hover .scroll,
      :host:focus .scroll {
        visibility: visible;
      }

      .hide-scroll::-webkit-scrollbar {
        display: none;
      }

      .scroll {
        overflow-x: auto;
        width: 100%;
        z-index: 5;
        visibility: hidden;
      }

      .scroll .scroll-content {
        display: flex;
        flex-wrap: nowrap;
        visibility: visible;
      }

      .scroll .scroll-delay,
      .scroll .scroll-delay:hover {
        transition: visibility 0.2s;
      }

      .smooth {
        scroll-behavior: smooth;
      }

      .left,
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: 100%;
        top: 0;
        bottom: 0;
        z-index: 10;
      }

      .left {
        left: 0;
        background: linear-gradient(
          to left,
          rgba(12, 12, 58, 0) 0%,
          var(--blue-900) 100%
        );
      }

      .right {
        right: 0;
        background: linear-gradient(
          to right,
          rgba(12, 12, 58, 0) 0%,
          var(--blue-900) 100%
        );
      }

      .btn-left,
      .btn-right {
        width: 2.8rem;
        height: 2.8rem;
        background: var(--gray-700);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
      }

      .visibility {
        display: none !important;
      }
    `,
  ],
  standalone: true,
  providers: [CommonModule],
})
export class ScrollXComponent implements AfterContentInit, AfterContentChecked {
  @ViewChild('scrollMenu', { static: true }) scrollMenu: ElementRef;

  @ViewChild('scrollContent', { static: true }) scrollContent: ElementRef;

  @Input() scrollToFixDistance = false;

  @Input() scrollDistance = 300;

  @Input() hideScroll = false;

  Direction = Direction;

  rightDisabled = true;

  leftDisabled = true;

  scrollSmooth = true;

  private scrollByButton = false;

  private timer;

  private children: HTMLElement[] = [];

  private mouseDown = false;

  private startX: any;

  private scrollLeft: any;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScroll();
  }

  ngAfterContentInit(): void {
    this.checkScroll();
    this.updateChildren();
    const first = this.children[0];
    if (first) {
      first.classList.add(activeClass);
    }
  }

  ngAfterContentChecked(): void {
    this.checkScroll();
    this.updateChildren();
  }

  actionScroll(direction: Direction): void {
    if (!this.scrollToFixDistance) {
      this.scrollByButton = true;
      this.getElToScroll(direction).scrollIntoView(scrollIntoViewOptions);
    } else {
      if (direction === Direction.left) {
        this.scrollMenu.nativeElement.scrollLeft -= this.scrollDistance;
      } else {
        this.scrollMenu.nativeElement.scrollLeft += this.scrollDistance;
      }
    }
    this.checkScroll();
  }

  onScroll(): void {
    this.checkScroll();
    if (this.scrollByButton) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.onScrollStop(), 150);
    } else {
      this.updateActiveClass();
    }
  }

  onScrollStop(): void {
    this.scrollByButton = false;
  }

  checkScroll(): void {
    this.scrollMenu.nativeElement.scrollLeft === 0
      ? (this.leftDisabled = true)
      : (this.leftDisabled = false);

    const newScrollLeft = this.scrollMenu.nativeElement.scrollLeft;
    const width = this.scrollMenu.nativeElement.clientWidth;
    const scrollWidth = this.scrollMenu.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) < 20
      ? (this.rightDisabled = true)
      : (this.rightDisabled = false);
  }

  startDragging(e): void {
    this.scrollSmooth = false;
    this.mouseDown = true;
    this.startX = e.pageX - this.scrollMenu.nativeElement.offsetLeft;
    this.scrollLeft = this.scrollMenu.nativeElement.scrollLeft;
  }

  stopDragging(): void {
    this.scrollSmooth = true;
    this.mouseDown = false;
  }

  mouseMove(e): void {
    if (!e || !this.mouseDown) {
      return;
    }
    const x = e.pageX - this.scrollMenu.nativeElement.offsetLeft;
    const scroll = x - this.startX;
    this.scrollMenu.nativeElement.scrollLeft = this.scrollLeft - scroll;
  }

  private updateChildren(): HTMLElement[] {
    this.children = Array.from(this.scrollContent.nativeElement.children);
    return this.children;
  }

  private updateActiveClass(): void {
    const scrollLeft = this.scrollMenu.nativeElement.scrollLeft;
    const nextActiveIndex = this.children.findIndex(
      ({ offsetLeft, offsetWidth }) => {
        return (
          offsetLeft >= scrollLeft && scrollLeft <= offsetLeft + offsetWidth
        );
      }
    );

    if (nextActiveIndex >= 0) {
      const activeItem = this.children.find(el =>
        el.classList.contains(activeClass)
      );
      if (activeItem) {
        activeItem.classList.remove(activeClass);
      }
      const nextActiveItem = this.children[nextActiveIndex];
      if (nextActiveItem) {
        nextActiveItem.classList.add(activeClass);
      }
    }
  }

  private getElToScroll(direction: Direction): HTMLElement {
    const minPosition = 0;
    const maxPosition = this.children.length - 1 || minPosition;
    const currentPosition = this.children.findIndex(el =>
      el.classList.contains(activeClass)
    );
    const calcNewPosition =
      currentPosition + (direction === Direction.right ? 1 : -1);
    const nextPosition =
      calcNewPosition >= minPosition && calcNewPosition <= maxPosition
        ? calcNewPosition
        : direction === Direction.right
        ? maxPosition
        : minPosition;
    this.children[currentPosition].classList.remove(activeClass);
    const nextEl = this.children[nextPosition];
    nextEl.classList.add(activeClass);
    return nextEl;
  }
}
