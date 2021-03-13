import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const text = control.value;
    const no =
      text.length > 0 &&
      !/^(([^<>()\[\]\\.,;:@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))[\s]*$/.test(
        text
      );
    return no ? { email: { value: text } } : null;
  };
}

@Directive({
  selector: '[email]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true,
    },
  ],
})
export class EmailDirective implements Validator, OnChanges {
  @Input() email!: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['email'];
    if (change) {
      this.valFn = emailValidator();
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.valFn(control);
  }
}
