# Caramel Point Template - FrontEnd Apps

## Content

This template is build with the followings frameworks and libraries:

- Next.js: To manage SSG and SSR, Routing and i18n.
- styled-components: To write CSS in JS.
- Typescript
- Lingui.js: To manage the translations and extract the base text to implement i18n.

This repository was bootstraped with next.js cli.

## Getting Started

First, run the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## i18n

### Lingui.js config

In the lingui.config.js replace the locales property values with the wants you need, the first one is the language default in your project, this will be used on the extract feature to populate your sentences/words surrounded by the `<Trans></Trans>` component.

#### Extract

To extract the texts in the base language, first, use the Trans component on your texts, and the run
`npm run extract`.

The `--clean` parameter on the script, deletes all unused ids used in Trans that were changed.
