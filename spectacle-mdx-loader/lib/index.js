"use strict";

const matter = require("gray-matter");
const normalizeNewline = require("normalize-newline");

const {
  wrapComponent,
  trim,
  removeInlineModules,
  removeDefaultExport,
  addInlineModules,
  nameForComponent,
  isolateNotes,
  removeNotes,
  MOD_REG,
} = require("./helpers");

const SLIDE_REG = /\n---\n/;

const SLIDE_TYPE = "Slide";
const NOTES_TYPE = "Notes";

// eslint-disable-next-line max-statements
module.exports = async function spectacleMdxLoader(src) {
  const callback = this.async();
  const mdx = await import("@mdx-js/mdx");
  const { data, content } = matter(src);

  const inlineModules = [];

  const options = {
    format: "mdx",
    jsx: true,
    providerImportSource: "@mdx-js/react",
  };

  const separatedContent = normalizeNewline(content)
    /*
     * Set aside all inline JSX import and export statements from the MDX file.
     * When mdx.sync() compiles MDX into JSX, it will stub any component that doesn't
     * have a corresponding import. Therefore, we will re-add all of the imports/exports
     * to each slide before compiling the MDX via mdx.sync().
     */
    .replace(MOD_REG, (value, group1) => {
      if (!group1) {
        // group1 is empty, so this is not the import/export case we're looking for
        return value;
      }
      // found an inline export or import statement
      inlineModules.push(value);
      return "";
    })
    .replace("<!-- prettier-ignore-start -->", "")
    .replace("<!-- prettier-ignore-end -->", "")
    /*
     * Split the MDX file by occurences of `---`. This is a reserved symbol
     * to denote slide boundaries.
     */
    .split(SLIDE_REG);

  /*
   * Process the content and generate an array of slide components
   */
  const slides = separatedContent
    .map(removeNotes)
    .map((mdxContent) => addInlineModules(mdxContent, inlineModules))
    .map((mdxContent) => {
      try {
        const res = mdx.compileSync(mdxContent, options);
        return res.value;
      } catch (err) {
        console.error(err);
        console.log("Content: ", mdxContent, "\n\n");
        throw err;
      }
    })
    .map(removeDefaultExport)
    .map(removeInlineModules)
    .map(trim)
    .map((mdxContent, index) => wrapComponent(mdxContent, index, SLIDE_TYPE));

  /*
   * Process the content and generate an array of notes components
   */
  const notes = separatedContent
    .map(isolateNotes)
    .map((mdxContent) => addInlineModules(mdxContent, inlineModules))
    .map((mdxContent) => {
      const res = mdx.compileSync(mdxContent, options);
      return res.value;
    })
    .map(removeDefaultExport)
    .map(removeInlineModules)
    .map(trim)
    .map((mdxContent, index) => wrapComponent(mdxContent, index, NOTES_TYPE));

  const { modules = [] } = data;
  const slideWrapperNames = [];
  const noteWrapperNames = [];

  /*
   * Begin composing the final output. Include React, mdx, modules, and the inline
   * export/import statements that we removed in Step 6.
   */
  let allCode = `
import React from 'react'
import {useMDXComponents as _provideComponents} from '@mdx-js/react'

${modules.join("\n")}
${inlineModules
  .filter((el, i, arr) => {
    return arr.indexOf(el) === i;
  })
  .join("\n")}\n\n`;

  /*
   * Add in the slide component definitions. Keep track of the component names.
   */
  slides.forEach((s, i) => {
    allCode += `${s}\n\n`;
    slideWrapperNames.push(nameForComponent(i, SLIDE_TYPE));
  });

  /*
   * Add in the notes component definitions. Keep track of the component names.
   */
  notes.forEach((n, i) => {
    allCode += `${n}\n\n`;
    noteWrapperNames.push(nameForComponent(i, NOTES_TYPE));
  });

  /*
   * Finally, declare the default export as an array of the slide components.
   * See /examples/mdx/for how to import and use the generated slide components.
   */
  const footer = `
export const notes = [${noteWrapperNames}];\n\n
export default [${slideWrapperNames}]`;
  allCode += footer;

  return callback(null, allCode);
};
