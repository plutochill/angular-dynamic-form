import { EFormControlType } from "./dynamic-form.enum";

export interface IControlValidators {
    min?: number;
    max?: number;
    required?: boolean;
    requiredTrue?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    nullValidator?: boolean;
}

interface IControlOptions {
    min?: number;
    max?: number;
    step?: number;
    icon?: string;
}

export interface IControlSelectOptions {
    label: string;
    value: string | number;
    checked?: boolean;
}

export interface IFormConfigControls {
    name: string; // name of the control
    label: string; // label of the control
    value: string | number; // value of the control
    type: EFormControlType; // type of the control
    placeholder?: string; // placeholder of the control
    validators?: IControlValidators; // validators of the control
    options?: IControlOptions; // basic options of the control
    selectOptions?: IControlSelectOptions[]; // select options of the control
    isDisabled?: boolean;
    isHide?: boolean;
    span?: number; // 1-24
    controls?: IFormConfigControls[];
}

export interface IFormConfig {
    title?: string;
    controls: IFormConfigControls[];
}