export interface BaseInputFormResponseInterface {
  group: string | null;
  label: string | null;
  value: string | null;
  formKey: string | null;
  formValue: any | null;
  formPlaceholder: string | null;
  formType:
    | "text"
    | "number"
    | "email"
    | "date"
    | "datetime"
    | "dropdown"
    | "checkbox"
    | "mobilenumber"
    | "textarea"
    | null;
  formOptions: {
    readOnly?: boolean;
    hidden?: boolean;
    dropdownItems?: {
      name: string;
      value: string;
    }[];
  };
  formValidation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minNumber?: number;
    maxNumber?: number;
  };
  [key: string]: any;
}
