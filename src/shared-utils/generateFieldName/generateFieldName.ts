export const generateFieldName = (name: string, prefix?: string) =>
  prefix
    ? `${prefix}${
        prefix.endsWith('.')
          ? name
          : `${name.charAt(0).toUpperCase()}${name.slice(1)}`
      }`
    : name;
