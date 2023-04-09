import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EFormControlType } from '../dynamic-form.enum';

@Component({
  selector: 'app-date-picker-control',
  templateUrl: './date-picker-control.component.html',
  styleUrls: ['./date-picker-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DatePickerControlComponent
    }
  ],
})
export class DatePickerControlComponent implements OnChanges  {
  @Input() type: EFormControlType;
  @Input() value: string;


  onChange = (valueArrayStr: string) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  eFormControlType: typeof EFormControlType = EFormControlType;
  date: Date | Date[];


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value && !changes.value.firstChange) {
      this.writeValue(changes.value.currentValue);
    }
  }


  onDateChange(value: Date | Date[]) {
    if (Array.isArray(value)) {
      const timeArr = value.map((date: Date) => {
        return date.getTime();
      });
      this.value = timeArr.join(',')
    } else {
      this.value = value.getTime() + '';
    }

    this.onChange(this.value)
  }

  writeValue(value: string | number) {
    if (!value) { return; }

    value = value + '';
    const timestamps = value.split(',');
    
    if (this.type === this.eFormControlType.RANGE) {
      this.date = timestamps[0] ? timestamps.map(item => {return new Date(+item)}) : [];
      
    } else {
      this.date = timestamps[0] ? new Date(+timestamps[0]) : null;
    }

    console.log(this.date)
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
