import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-inputs',
  templateUrl: './text-inputs.component.html',
  styleUrls: ['./text-inputs.component.scss'],
})

// reusable component that handles and validates text inputs
export class TextInputsComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  /* @Self tells the program to look for the
  dependency only in the local injector  
  */
  constructor(@Self() public control: NgControl) {
    this.control.valueAccessor = this;
  }

  onChange(event: string) {}

  onTouched() {}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    let control = this.control.control;
    let validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator
      ? [control.asyncValidator]
      : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }
}
