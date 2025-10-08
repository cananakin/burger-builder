import type { IngredientName } from "../../../store/slice";

// types for your dynamic form
type Option = { value: string; displayValue: string };

type ValidationRules = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean  // add if you want
};

type ValidationMessages = Partial<Record<keyof ValidationRules, string>>;

export type BaseField<TType extends 'input' | 'textarea' | 'select'> = {
    elementType: TType;
    value: string;
    valid: boolean;
    touched: boolean;
    label?: string;
  };
  
export type InputField = BaseField<'input'> & {
    elementConfig: {
      type: string;
      placeholder?: string;
    };
    validation?: ValidationRules;
    validationMessage?: ValidationMessages;
  };
  
  export type TextareaField = BaseField<'textarea'> & {
    elementConfig: {
      placeholder?: string;
      rows?: number;
    };
    validation?: ValidationRules;
    validationMessage?: ValidationMessages;
  };
  
  export type SelectField = BaseField<'select'> & {
    elementConfig: {
      options: Option[];
    };
    // select usually doesn’t need rules, but you can keep it
    validation?: ValidationRules;
    validationMessage?: ValidationMessages;
  };
  
  // whole form schema
  export type OrderForm = {
    name: InputField;
    street: InputField;
    zipCode: InputField;
    country: InputField;
    email: InputField;
    deliveryMethod: SelectField;
  };
  
  type Ingredients = Record<IngredientName, number>;

  export type OrderPayload = {
    ingredients: Ingredients;
    price: number;
    orderData: Record<keyof OrderForm, string>;
  };