import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'red';
  }
}
