import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { EFormControlType } from '../dynamic-form/dynamic-form.enum';
import { IFormConfig } from '../dynamic-form/dynamic-form.interface';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  formConfig: IFormConfig[];
  formValue: any;
  isEdit: boolean = true;
  constructor() { }

  ngOnInit() {
    this.formConfig = [{
      title: 'My Form',
      controls: [
        {
          name: 'name',
          label: 'Name',
          value: '',
          type: EFormControlType.TEXT,
          validators: {
            required: true,
          },
          placeholder: 'Enter your name',
        },
        {
          name: 'sex',
          label: 'Sex',
          value: 0,
          type: EFormControlType.RADIO,
          selectOptions: [
            {label: '男'  , value: 0},
            {label: '女'  , value: 1},
          ]
        },
        {
          name: 'age',
          label: 'Age',
          value: null,
          type: EFormControlType.NUMBER,
          placeholder: 'Enter your age',
          options: {
            min: 0,
            max: 100,
            step: 1,
          }
        }
      ]
    }, {
      title: 'My Form 2',
      controls: [
        {
          name: 'hobies',
          label: 'Hobies',
          value: '',
          type: EFormControlType.CHECKBOX_GROUP,
          selectOptions: [
            {label: '游泳'  , value: 0},
            {label: '跑步'  , value: 1},
            {label: '爬山'  , value: 2},
            {label: '打球'  , value: 3},
          ]
        }
      ]
    }]

    setTimeout(() => {
      this.formValue = {
        name: 'John',
        sex: 1,
        age: 18,
      }
    }, 1000);
  }

  onSubmit() {
    console.log(this.dynamicForm?.myForm.value)
  }

  get isValid() {
    return this.dynamicForm?.myForm.valid;
  }

}
