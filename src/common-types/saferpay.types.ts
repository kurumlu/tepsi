export enum SaferpayFieldTypeEnum {
  CARDNUMBER = 'cardnumber',
  HOLDERNAME = 'holdername',
  EXPIRATION = 'expiration',
  CVC = 'cvc',
}

export enum SaferpayFieldValidationReason {
  EMPTY = 'empty',
  EXPIRED = 'expired',
  INVALID = 'invalid',
  UNSUPPORTED = 'unsupported',
}

export type SaferpayFieldsFieldValidation = {
  event: string;
  fieldType: SaferpayFieldTypeEnum;
  id: string;
  isValid?: boolean;
  reason?: SaferpayFieldValidationReason;
};

export type SaferpayFieldsValidation = {
  [key: string]: SaferpayFieldsFieldValidation;
};

export type SaferpayFieldsFieldGlossary = {
  field: SaferpayFieldTypeEnum;
  text: string;
};
