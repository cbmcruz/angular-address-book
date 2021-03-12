import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function whitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const text = control.value;
    console.log(text, text.length);
    const no = text.length > 0 && text.trim() === '';
    return no ? { whitespace: { value: text } } : null;
  };
}

@Directive({
  selector: '[whitespace]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: WhitespaceDirective,
      multi: true,
    },
  ],
})
export class WhitespaceDirective implements Validator, OnChanges {
  @Input() whitespace!: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['whitespace'];
    if (change) {
      this.valFn = whitespaceValidator();
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.valFn(control);
  }
}
