import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IControlSelectOptions } from '../dynamic-form.interface';

@Component({
  selector: 'app-checkbox-group-control',
  templateUrl: './checkbox-group-control.component.html',
  styleUrls: ['./checkbox-group-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: CheckboxGroupControlComponent
  }]
})
export class CheckboxGroupControlComponent implements OnChanges {
  onChange = (value) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  @Input() selectOptions: IControlSelectOptions[] = [];
  value: string

  valueArr: (string | number)[] = [];

  
  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes.value && !changes.value.firstChange) {
      this.writeValue(changes.value.currentValue)
      this.onChange(changes.value.currentValue);
    }
  }



  
  updateValue(value: IControlSelectOptions[]) {
    this.valueArr = value
      .filter((option: IControlSelectOptions) => option.checked)
      .map((option: IControlSelectOptions) => {return option.value})

    this.onChange(this.valueArr.join(','));
  }

  writeValue(value) {
    
    if (value && this.selectOptions) {
      if (typeof value === 'string') {
        this.valueArr = value.split(',');
      } else {
        this.valueArr = value;
      }
      this.selectOptions.forEach((option: IControlSelectOptions) => {
        option.checked = this.valueArr.includes(option.value);
      })  
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
