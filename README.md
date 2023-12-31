# RSBuild + Spectacle + MDX Example

This is a boilerplated version of my own personal presentation slides setup.

This started life as a combination of Create-React-App (+ CRACO overrides), Spectacle for the slide setup, and Spectacle's MDX loader added to the Webpack config.

After using that for a few years, I just [migrated it to use RSBuild](https://rsbuild.dev/guide/migration/cra), which is an abstraction layer on top of the Webpack-compatible RSPack build tool.

Use of RSBuild+RSPack allowed me to reuse the `spectacle-mdx-loader` Webpack loader for processing the slides, and build the slides a lot faster (builds went from ~30s with CRA to ~2s with RSBuild).

I've also included all my personal slides setup, theming, and custom MDX components that I've built up over the years.

Each presentation is a separate subfolder under `src/presentations` with its own MDX files. I've also got a common set of slide intros in `src/presentation/common/`, and mix those in to the start of each slide deck.

I swap which presentation I'm showing by changing the slides import in `src/App.tsx`, and then hand-edit the `<title>` attribute in `public/index.html`.
