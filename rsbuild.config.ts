import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

import type { RuleSetRule } from "@rspack/core";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [pluginReact()],
  html: {
    template: "./public/index.html",
  },
  tools: {
    rspack: (config) => {
      const reExampleFiles = /examples(\/|\\)*.*/;

      config.module?.rules?.unshift({
        test: reExampleFiles,
        use: ["raw-loader"],
      });

      const swcRules = config.module?.rules?.filter(
        (rule): rule is RuleSetRule => {
          return (
            !!rule &&
            typeof rule === "object" &&
            (("type" in rule && rule.type === "javascript/auto") ||
              "mimetype" in rule)
          );
        }
      )!;

      // Don't transpile any of the files under a `examples/` folder.
      swcRules.forEach((rule) => {
        rule.exclude = [
          /\.mdx?$/,
          (path: string) => {
            const shouldExclude = reExampleFiles.test(path);
            return shouldExclude;
          },
        ];
      });

      // Deep clone the loader.
      // Probably actually not necessary now, but I was doing some modifications
      // earlier in the migration process.
      const swcLoader: {
        loader: string;
        ident?: string | undefined;
        options?: string | Record<string, any> | undefined;
      } = JSON.parse(JSON.stringify(swcRules[0].use?.[0]!));

      const mdxLoader: RuleSetRule = {
        test: /\.mdx$/,
        use: [
          swcLoader,
          {
            loader: "spectacle-mdx-loader-fork",
          },
        ],
      };

      config.module?.rules?.unshift(mdxLoader);

      return config;
    },
  },
});
