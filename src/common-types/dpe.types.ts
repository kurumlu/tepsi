export enum DpeTileStep {
  INTRO = 1,
  VALIDATION = 2,
  CONFIRMATION = 3,
}

export enum DpePartner {
  VITALITY = 'vitality',
}

export enum DpeDisplayType {
  BUTTON = 'button',
  LABEL = 'label',
}

export enum AuthFormStep {
  EMAIL = 1,
  LOGIN = 2,
  REGISTRATION = 3,
  PASSWORD_FORGOTTEN = 4,
}

export type AuthFormStepContext = {
  from: AuthFormStep;
  to: AuthFormStep;
};
