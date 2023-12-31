import styled from "styled-components";

export const colors = {
  primary: "black",
  secondary: "#1F2022",
  // secondary: "#eee",
  tertiary: "#03A9FC",
  quaternary: "black",
  // quaternary: "#764ABC",
};

export const theme = {
  colors,
  size: {
    width: "100%",
    height: "100%",
  },
  space: [0, 4, 16, 24, 32],
  fonts: {
    header: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
    text: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
    monospace: '"Consolas", "Menlo", monospace',
  },
  fontSizes: {
    h1: "7.05rem",
    h2: "5.88rem",
    h3: "4.9rem",
    h4: "3.82rem",
    h5: "3.19rem",
    h6: "2.66rem",
    text: "2.5rem",
  },
};

export const OverridePresentationStyles = styled("div")`
  .spectacle-slide {
    margin: 0 !important;
  }

  .spectacle-content {
    padding: 20px;
  }

  code {
    color: black;
    font-family: monospace;
    background-color: rgba(0, 0, 0, 0.15);
    font-size: 1em;
    margin: 0.25rem auto;
    padding: 0px 5px;
    border-radius: 3px;
  }

  pre {
    padding: 5px !important;
    width: unset !important;
  }

  pre > code {
    padding: 0;
    margin: 0;
  }

  .react-syntax-highlighter-line-number {
    display: none;
  }

  ul,
  p {
    width: 100%;
  }

  p,
  ul li,
  ol li {
    font-size: 2.5rem;
  }

  li ul li,
  li ul li p,
  li ul li a,
  li ol li,
  li ol li p,
  li ol li a,
  ol li p {
    font-size: 2.25rem;
  }

  blockquote {
    margin: 0;
    padding: 5px;
    font-style: italic;
    background-color: #8080801a;
    border-left: 8px solid #337ab7;
  }

  div[font-size] > a {
    font-size: unset !important;
  }

  div[font-size="text"] {
    text-align: left;
    align-self: flex-start;
  }

  a {
    text-decoration: none;
    color: blue;
  }

  li > p {
    display: inline;
  }

  .spectacle-content p,
  .spectacle-content ol,
  .spectacle-content ul {
    text-align: left;
  }

  div > ul,
  div > ol {
    margin-block-start: 20px;
  }

  a > code {
    color: blue;
  }

  table,
  table th,
  table td {
    font-size: 1.75rem;
  }

  table thead td {
    text-align: center;
  }

  .fullWidth {
    width: 100%;
  }

  .spectacle-content .scrollable-code-slide pre.prism-code {
    max-height: 750px !important;
    min-height: 750px !important;
  }
`;

export const okaidiaTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: "#f8f8f2",
    background: "none",
    textShadow: "0 1px rgba(0, 0, 0, 0.3)",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    fontSize: "1em",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#f8f8f2",
    background: "#272822",
    textShadow: "0 1px rgba(0, 0, 0, 0.3)",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    fontSize: "1em",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",
    borderRadius: "0.3em",
  },
  ':not(pre) > code[class*="language-"]': {
    background: "#272822",
    padding: ".1em",
    borderRadius: ".3em",
    whiteSpace: "normal",
  },
  comment: {
    color: "#8292a2",
  },
  prolog: {
    color: "#8292a2",
  },
  doctype: {
    color: "#8292a2",
  },
  cdata: {
    color: "#8292a2",
  },
  punctuation: {
    color: "#f8f8f2",
  },
  namespace: {
    opacity: ".7",
  },
  property: {
    color: "#f92672",
  },
  tag: {
    color: "#f92672",
  },
  constant: {
    color: "#f92672",
  },
  symbol: {
    color: "#f92672",
  },
  deleted: {
    color: "#f92672",
  },
  boolean: {
    color: "#ae81ff",
  },
  number: {
    color: "#ae81ff",
  },
  selector: {
    color: "#a6e22e",
  },
  "attr-name": {
    color: "#a6e22e",
  },
  string: {
    color: "#a6e22e",
  },
  char: {
    color: "#a6e22e",
  },
  builtin: {
    color: "#a6e22e",
  },
  inserted: {
    color: "#a6e22e",
  },
  operator: {
    color: "#f8f8f2",
  },
  entity: {
    color: "#f8f8f2",
    cursor: "help",
  },
  url: {
    color: "#f8f8f2",
  },
  ".language-css .token.string": {
    color: "#f8f8f2",
  },
  ".style .token.string": {
    color: "#f8f8f2",
  },
  variable: {
    color: "#f8f8f2",
  },
  atrule: {
    color: "#e6db74",
  },
  "attr-value": {
    color: "#e6db74",
  },
  function: {
    color: "#e6db74",
  },
  "class-name": {
    color: "#e6db74",
  },
  keyword: {
    color: "#66d9ef",
  },
  regex: {
    color: "#fd971f",
  },
  important: {
    color: "#fd971f",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
};
