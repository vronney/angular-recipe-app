import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') show = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.show = this.elRef.nativeElement.contains(event.target) ? !this.show : false;
  }
  constructor(private elRef: ElementRef) {}
}
