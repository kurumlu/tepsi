export interface StringTMap<T> {
  [key: string]: T;
}
export interface StringStringMap extends StringTMap<string> {}

export interface StringNumberMap extends StringTMap<number> {}
