import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { AddressControlComponent } from './address-control/address-control.component';
import { CheckboxGroupControlComponent } from './checkbox-group-control/checkbox-group-control.component';
import { DatePickerControlComponent } from './date-picker-control/date-picker-control.component';
import { UploadControlComponent } from './upload-control/upload-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

const NzModules = [
  NzButtonModule,
  NzIconModule,
  NzGridModule, 
  NzSpaceModule, 
  NzCascaderModule, 
  NzCheckboxModule, 
  NzDatePickerModule, 
  NzTimePickerModule, 
  NzFormModule, 
  NzInputModule, 
  NzInputNumberModule, 
  NzRadioModule, 
  NzRateModule, 
  NzSelectModule, 
  NzSliderModule, 
  NzSwitchModule, 
  NzUploadModule, 
  NzNotificationModule 
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzModules
  ],
  declarations: [
    DynamicFormComponent,
    AddressControlComponent,
    CheckboxGroupControlComponent,
    DatePickerControlComponent,
    UploadControlComponent
  ],
  exports: [
    DynamicFormComponent,
    AddressControlComponent,
    CheckboxGroupControlComponent,
    DatePickerControlComponent,
    UploadControlComponent
  ]
})
export class DynamicFormModule { }
