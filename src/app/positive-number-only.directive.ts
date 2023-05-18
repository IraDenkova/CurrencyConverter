import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appPositiveNumberOnly]'
})
export class PositiveNumberOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')

    const numericValue = parseFloat(sanitizedValue);
    const finalValue = isNaN(numericValue) || numericValue <= 0 ? '' : numericValue

    inputElement.value = finalValue.toString()
  }
}