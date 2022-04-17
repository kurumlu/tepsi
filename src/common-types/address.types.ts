export enum AddressFieldName {
  ADDRESS = 'address',
  ADDRESS_LINE_2 = 'addressLine2',
  ADDRESS_LINE_3 = 'addressLine3',
  ADDRESS_LINE_4 = 'addressLine4',
  CITY = 'city',
  CITY_FRENCH = 'cityFrench',
  CUSTOM_TOWN = 'customTown',
  COUNTRY = 'country',
  COUNTY = 'county',
  HOUSE_NUMBER = 'houseNumber',
  HOUSE_NUMBER_ADDITION = 'houseNumberAddition',
  POSTCODE = 'postCode',
  ZIP_CODE = 'zipCode',
  STATE = 'state',
  STATE_ISO = 'stateIso',
  FINDER = 'finder',
}

export type Address = Partial<Record<AddressFieldName, string>>;

export type USState = {
  abbreviation: string;
  countryId: number;
  market: string;
  name: string;
};

export type UKAddress = {
  moniker: string;
  partialAddress: string;
};

export enum CountryId {
  NL = 15, // Netherlands
  DE = 7, // Germany
  BE = 3, // Belgium
  LU = 14, // Luxembourg
  FR = 9, // France
  US = 20, // United States of America
  GB = 19, // Great Britain
  GG = 88, // Guernsey
  JE = 116, // Jersey
  IE = 12, // Ireland
  AU = 2, // Australia
  NZ = 17, // New Zeeland
  BFPO = 245, // British Forces Post Office
  CZ = 69, // Czech Republik
}
