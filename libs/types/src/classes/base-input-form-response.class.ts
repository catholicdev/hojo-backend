import { BaseInputFormResponseInterface } from "@interfaces";

export class BaseInputFormResponse implements BaseInputFormResponseInterface {
  public group: string;
  public label: string;
  public value: string;
  public formKey: string;
  public formValue: any;
  public formPlaceholder: string;
  public formType:
    | "number"
    | "text"
    | "email"
    | "date"
    | "datetime"
    | "dropdown"
    | "checkbox"
    | "mobilenumber"
    | "textarea";
  public formOptions: {
    readOnly?: boolean;
    hidden?: boolean;
    dropdownItems?: { name: string; value: string }[];
  };
  public formValidation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minNumber?: number;
    maxNumber?: number;
  };

  constructor() {
    this.group = null;
    this.label = null;
    this.value = null;
    this.formKey = null;
    this.formValue = null;
    this.formPlaceholder = null;
    this.formType = null;
    this.formOptions = {};
    this.formValidation = {};
  }
}
