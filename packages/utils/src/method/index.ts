/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onCheckType = (source: any, type: TypesBase): source is TypesBase => {
  return typeof source === type;
};
export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};

export const propsToStyle = (arrStyle: Array<any>) => {
  return arrStyle.filter((x) => x !== undefined && !Object.values(x).some((v) => v === undefined));
};
