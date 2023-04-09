import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ADDRESS } from './address';

@Component({
  selector: 'app-address-control',
  templateUrl: './address-control.component.html',
  styleUrls: ['./address-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: AddressControlComponent
    }
  ]
})
export class AddressControlComponent implements OnChanges {
  addressList: any[] | null = ADDRESS;
  addressValue: string[] = [];
  addressDetail: string = '';
  
  onChange = (valueArrayStr: string) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;
  
  
  value: string; // "xxx,xxx,xx,xx"
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value && !changes.value.firstChange) {
      this.writeValue(changes.value.currentValue);
    }
  }

  combieAddressToStr(): void {
    const addArr = [].concat(this.addressValue, this.addressDetail ? this.addressDetail : [])
    this.value = addArr.join(',')
  }

  onCascaderChanges(values: any): void {
    this.addressValue = values;
    this.combieAddressToStr();
    this.onChange(this.value)
  }
  onDetailChanges(value: string): void {
    this.addressDetail = value;
    this.combieAddressToStr();
    this.onChange(this.value)
  }


  writeValue(value: string) {
    if (!value) { return }

    this.addressValue = [];
    const addArr = value.split(',')
    addArr.map((item, index) => {
      if (index < 3) {
        this.addressValue.push(item);
      }
      if (index === 3) {
        this.addressDetail = item;
      }
    }) 
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
