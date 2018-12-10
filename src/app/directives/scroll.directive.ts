import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor(el: ElementRef) {

  }

    @HostListener('scroll', ['$event']) onMouseOver(event: UIEvent) {
        console.log('ey');
    }

}
