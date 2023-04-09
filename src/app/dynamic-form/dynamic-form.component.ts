import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { EFormControlType } from './dynamic-form.enum';
import { IControlValidators, IFormConfig, IFormConfigControls } from './dynamic-form.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy, OnChanges {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public eFormControlType: typeof EFormControlType = EFormControlType;
  public myForm: FormGroup;

  @Input() formConfig: IFormConfig[]; // 配置
  @Input() formValue: any; // ajax获取的数据
  @Input() isEdit?: boolean = true;


  

  constructor(private fb: FormBuilder) { 
    this.myForm = this.fb.group({});
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.formValue && changes.formValue?.currentValue) {
      this.updateFormConfig(changes.formValue.currentValue);
      this.updateFormValue(changes.formValue.currentValue);
    }
  }

  ngOnInit() {
    this.createFormGroup();

  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  createFormGroup(): void {
    this.formConfig.forEach((formGroup: IFormConfig) => {
      formGroup.controls.forEach((control: IFormConfigControls) => {
        const validators = this.createValidators(control);
        this.myForm.addControl(control.name, this.fb.control({value: control.value, disabled: !this.isEdit}, validators));
      });
    });
  }

  updateFormValue(formValue: any): void {
    this.myForm.patchValue(formValue);
  }

  updateFormConfig(formValue: any): void {
    this.formConfig.forEach((formGroup: IFormConfig) => {
      formGroup.controls.forEach((control: IFormConfigControls) => {
        control.value = formValue[control.name];
      });
    })
  }

  createValidators(control: IFormConfigControls): ValidatorFn[] {
    if (!control.validators) {
      return [];
    }
    let validatorsToAdd = [];
    for (const [key, value] of Object.entries(control.validators)) {
      switch (key) {
        case 'min':
          validatorsToAdd.push(Validators.min(value));
          break;
        case 'max':
          validatorsToAdd.push(Validators.max(value));
          break;
        case 'required':
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case 'requiredTrue':
          if (value) {
            validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case 'email':
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case 'minLength':
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case 'maxLength':
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        case 'pattern':
          validatorsToAdd.push(Validators.pattern(value));
          break;
        case 'nullValidator':
          if (value) {
            validatorsToAdd.push(Validators.nullValidator);
          }
          break;
        default:
          break;
      }
    }
    return validatorsToAdd;
  }


}
