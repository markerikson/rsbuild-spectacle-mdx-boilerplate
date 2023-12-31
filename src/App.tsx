import React, { useContext } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Deck, Slide, DeckContext, FlexBox, Box, FullScreen } from "spectacle";

import {
  theme,
  OverridePresentationStyles,
} from "./components/presentationTheme";

import { presentationdMdxComponents } from "./components/layout";

import presentationSlides from "./presentations/demo-presentation";

const leftArrow = (
  <path d="M512,97.707L414.293,0L0,414.293l414.293,414.293L512,730.88L195.414,414.293L512,97.707z" />
);
const rightArrow = (
  <path d="M97.707,0L0,97.707l316.586,316.586L0,730.88l97.707,97.706L512,414.293L97.707,0z" />
);

const IS_YOUTUBE_THUMBNAIL = false;

interface SCBCProps {
  onClick: () => void;
  enabled: boolean;
  side: "left" | "right";
  icon: React.ReactNode;
  label: string;
}

const SlideChangeButtonContainer = ({
  onClick,
  enabled,
  side,
  icon,
  label,
}: SCBCProps) => {
  const sidePosition = { [side]: 0 };
  return (
    <FlexBox
      justifyContent="center"
      alignItems="center"
      position="absolute"
      {...sidePosition}
      top={0}
      bottom={0}
      className="slideControlsButton"
    >
      <button
        type="button"
        aria-label={label}
        onClick={enabled ? onClick : undefined}
        disabled={!enabled}
        style={{
          border: 0,
          backgroundColor: "transparent",
          display: enabled ? undefined : "none",
        }}
      >
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 512 828.586"
          role="presentation"
          focusable="false"
        >
          {icon}
        </svg>
      </button>
    </FlexBox>
  );
};

type TFProps = {
  numberOfSlides: number;
  slideNumber: number;
  showDecorations: boolean;
};

const SlidesTemplate = ({
  slideNumber,
  numberOfSlides,
  showDecorations = !IS_YOUTUBE_THUMBNAIL,
}: TFProps) => {
  return (
    <React.Fragment>
      <FlexBox
        justifyContent="space-between"
        position="absolute"
        bottom={0}
        width={1}
        margin="0 auto"
        zIndex={250}
      >
        <Box padding="0 0.5em">
          {showDecorations && <FullScreen color="primary" size={24} />}
        </Box>
        <Box padding="0.5em">
          {showDecorations ? (
            <span>
              {slideNumber} / {numberOfSlides}
            </span>
          ) : null}
        </Box>
      </FlexBox>
    </React.Fragment>
  );
};

interface SCProps {
  MDXSlide: React.ComponentType;
  isYoutubeThumbnail: boolean;
}

const SlidesContainer = ({ MDXSlide, isYoutubeThumbnail }: SCProps) => {
  const slideControls = useContext(DeckContext);
  const { advanceSlide, regressSlide, activeView, slideCount } = slideControls;
  const { slideIndex } = activeView;

  const canGoForward = slideIndex < slideCount - 1;
  const canGoBack = slideIndex > 0;
  const backgroundColor = isYoutubeThumbnail ? "#eee" : "white";

  return (
    <Slide backgroundColor={backgroundColor} padding={1}>
      <SlideChangeButtonContainer
        enabled={canGoBack}
        onClick={regressSlide}
        icon={leftArrow}
        label="Previous Slide"
        side="left"
      />
      <SlideChangeButtonContainer
        enabled={canGoForward}
        onClick={advanceSlide}
        icon={rightArrow}
        label="Next Slide"
        side="right"
      />
      <Box
        maxWidth="1700px"
        height="100%"
        width="100%"
        margin="0 auto"
        overflowY="auto"
      >
        <MDXSlide />
      </Box>
    </Slide>
  );
};

interface AppProps {
  slides?: React.ComponentType[];
  isYoutubeThumbnail?: boolean;
}

const App = ({
  slides = presentationSlides,
  isYoutubeThumbnail = IS_YOUTUBE_THUMBNAIL,
}: AppProps) => (
  <OverridePresentationStyles>
    <MDXProvider components={presentationdMdxComponents}>
      <Deck
        theme={theme as any}
        template={SlidesTemplate}
        transition={{ enter: {}, from: {}, leave: {} }}
      >
        {slides
          .map((MDXSlide, i) => {
            return [MDXSlide];
          })
          .map(([MDXSlide], i) => {
            return (
              <SlidesContainer
                key={`slide-${i}`}
                MDXSlide={MDXSlide}
                isYoutubeThumbnail={isYoutubeThumbnail}
              />
            );
          })}
      </Deck>
    </MDXProvider>
  </OverridePresentationStyles>
);

export default App;
