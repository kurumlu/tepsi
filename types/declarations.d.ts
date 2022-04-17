// declaration.d.ts
declare module '*.scss';

declare module '*.svg' {
  const content: FunctionComponent<SVGAttributes<SVGSVGElement>>;
  export default content;
}
