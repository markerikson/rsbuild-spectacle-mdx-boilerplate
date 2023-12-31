/// <reference types="@mdx-js/loader" />

declare module "*.mdx" {
  let MDXComponent: (props) => JSX.Element;
  const MDXSlideArray: ((props) => JSX.Element)[] = [];
  export default MDXSlideArray;
}
