import React from "react";
import {
  CodePane,
  Box,
  FlexBox,
  Heading,
  mdxComponentMap,
  Markdown,
} from "spectacle";

import { okaidiaTheme } from "./presentationTheme";

export const TitleSlide: React.FC<any> = ({ children, ...rest }) => (
  <FlexBox
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    maxWidth="100%"
    height="100%"
    {...rest}
  >
    {children}
  </FlexBox>
);

export const TitleDummy = () => null;
TitleDummy.displayName = "TitleDummy";

const BlockQuote = (props: any) => <blockquote>{props.children}</blockquote>;

export const presentationdMdxComponents = {
  ...mdxComponentMap,
  TitleDummy,
  blockquote: BlockQuote,
  h5: (props: any) => <Heading {...props} fontSize="h5" />,
  h6: (props: any) => <Heading {...props} fontSize="h6" />,
  wrapper: (props: any) => {
    // HACK This is _incredibly_ hacky.
    // We want to signal that certain slides are title slides, and
    // use a different layout for them.
    // We do this by rendering `<TitleDummy>` as the first component
    // inside the slide.
    // As of MDX v3, we get `_createMdxComponents` as `props.children`.
    // Call that, and look at the first component.
    // We have specifically added a `.displayName` field to it,
    // so we can check for that to determine if it's a title slide.
    const rewrittenChildren = props.children.type({});
    const childrenArray = rewrittenChildren.props.children;
    const isTitleSlide =
      childrenArray.length >= 0 &&
      // @ts-ignore
      childrenArray[0].type?.displayName === "TitleDummy";

    if (isTitleSlide) {
      return <TitleSlide {...props} />;
    } else {
      return <FlexBox flexDirection="column" {...props} />;
    }
  },
};

type MarkdownProps = React.ComponentProps<typeof Markdown>;

export const PresentationMarkdown = (props: MarkdownProps) => {
  const actualProps = {
    ...props,
    componentMap: presentationdMdxComponents,
  } as any;
  return <Markdown {...actualProps} />;
};

type CodePaneProps = React.ComponentProps<typeof CodePane>;

type DefaultCodePaneProps = Omit<CodePaneProps, "children"> & {
  source: string;
};

const defaultTheme = {
  ...okaidiaTheme,
  size: {
    width: "100%",
    height: "100%",
  },
};

export const DefaultCodePane = ({
  language = "jsx",
  highlightRanges = [],
  source,
  ...props
}: DefaultCodePaneProps) => {
  return (
    <CodePane
      language={language}
      highlightRanges={highlightRanges}
      {...props}
      theme={defaultTheme}
      showLineNumbers={false}
    >
      {source}
    </CodePane>
  );
};

interface LeftContentRightContentProps {
  leftContent: React.ReactNode;
  leftStyle?: React.CSSProperties;
  rightContent: React.ReactNode;
  rightStyle?: React.CSSProperties;
}

export const LeftContentRightContent = ({
  leftContent,
  leftStyle = {},
  rightContent,
  rightStyle,
}: LeftContentRightContentProps) => (
  <FlexBox alignItems="flex-start" flexWrap="wrap" className="dualContent">
    <Box minWidth={800} style={{ marginRight: 5, flex: "1", ...leftStyle }}>
      {leftContent}
    </Box>
    <Box minWidth={800} style={{ marginLeft: 5, flex: "1", ...rightStyle }}>
      {rightContent}
    </Box>
  </FlexBox>
);

interface LeftCodeRightContentProps extends LeftContentRightContentProps {
  leftSource: string;
  leftLanguage?: string;
}

export const LeftCodeRightContent = ({
  leftSource,
  leftLanguage = "jsx",
  ...otherProps
}: LeftCodeRightContentProps) => (
  <LeftContentRightContent
    {...otherProps}
    leftContent={
      <DefaultCodePane language={leftLanguage} source={leftSource} />
    }
  />
);

interface LeftCodeRightCodeProps extends LeftCodeRightContentProps {
  rightSource: string;
  rightLanguage?: string;
}

export const LeftCodeRightCode = ({
  leftSource,
  leftLanguage = "jsx",
  rightSource,
  rightLanguage = "jsx",
  ...otherProps
}: LeftCodeRightCodeProps) => (
  <LeftContentRightContent
    {...otherProps}
    leftContent={
      <DefaultCodePane source={leftSource} language={leftLanguage} />
    }
    rightContent={
      <DefaultCodePane source={rightSource} language={rightLanguage} />
    }
  />
);

interface LeftContentRightMarkdownProps extends LeftContentRightContentProps {
  children: string;
}

export const LeftContentRightMarkdown = ({
  children,
  ...otherProps
}: LeftContentRightMarkdownProps) => {
  return (
    <LeftContentRightContent
      {...otherProps}
      rightContent={<Markdown>{children}</Markdown>}
    />
  );
};

interface LeftCodeRightMarkdownProps extends LeftCodeRightContentProps {
  children: string;
}

export const LeftCodeRightMarkdown = ({
  children,
  ...otherProps
}: LeftCodeRightMarkdownProps) => {
  return (
    <LeftCodeRightContent
      {...otherProps}
      rightContent={<Markdown>{children}</Markdown>}
    />
  );
};
