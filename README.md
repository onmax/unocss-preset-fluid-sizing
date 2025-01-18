# unocss-preset-fluid-sizing [![npm](https://img.shields.io/npm/v/unocss-preset-fluid-sizing)](https://npmjs.com/package/unocss-preset-fluid-sizing)

UnoCSS preset for fluid sizing with UnoCSS philosophy in mind. A modern approach to `@media` queries.

`f-pt-min-32 f-pt-max-64` will be `32px` in mobiles and `64px` in desktops with a smooth transition for screens with width between 320px and 1920px.

## Features

- 🔥 Highly customizable via utilities.
- 📏 Supports `container` queries.
- 💅 A well-tested default configuration.
- 🙈 Works with `attribufify` preset.

## Resources

Learn about Fluid Sizing in CSS:

- [Fluid Typography](https://css-tricks.com/snippets/css/fluid-typography/)
- [Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)

## Usage
```shell
pnpm i -D unocss-preset-fluid-sizing unocss
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetFluidSizing } from 'unocss-preset-fluid-sizing'

export default defineConfig({
  presets: [
    // ...
    presetFluidSizing({/* options */}),
  ],
})
```

```html
<!-- Using default theme that comes with the preset -->
<div class="f-p-2xs f-text-xl" />

<!-- Using utilities -->
<div class="f-p f-p-min-32 f-p-max-48" />
<div class="f-text f-p-text-8 f-p-text-12" />
```

### Utilities

This preset provides a set of utilities for all CSS properties that accept a spacing value like `padding`, `margin`, `gap`, `width` and `font-size`. You need to attach the prefix `f-` to the utility name in order to use it.

> [!WARNING]
> In order to see the effect of the utilities, remember to use the 3 utilities shown below.

#### `f-${utility}-min-${minValue}`

Sets the minimum value for the utility. `f-pt-min-32` will set the `padding-top` to `32px` when the screen width is smaller than `320px`.

This utilitiy is mandatory. Defaults to `16`.

> By default, the minimum value will be set for screen with width smaller than `320px`. You can change this by passing the option `minContainerWidth` to the preset.

#### `f-${utility}-max-${maxValue}`

Sets the maximum value for the utility. `f-pt-max-48` will set the `padding-top` to `48px` when the screen width is greater than `1920px`.

This utilitiy is mandatory. Defaults to `16`.

> By default, the minimum value will be set for screen with width smaller than `1920px`. You can change this by passing the option `maxContainerWidth` to the preset.

#### `f-${utility}`

Sets the formula to compute the value for the give utility.

This utilitiy is mandatory.

> If using `Attributify preset` remember to add the self referencing char(`~`) to the utility attribute like `f-pt="~ min-32 max-64"`. Same as `flex` or `grid` attributes.

#### `f-base-${baseValue}`

> [!WARNING]
> This utility is experimental and may not work as expected.

Sets the base unit for the utility which by default is `1px`. You can also change the default base unit by passing the option `defaultBaseUnit` to the preset.

### Theme

By default the preset includes a theme with predefined values for spacing and font sizes that I have been using in my projects and in general is what you will need. This will save you time as you can do `f-p-2xs` instead of `f-p f-p-min-8 f-p-max-12` or `f-mt-lg` instead of `f-mt-min-48 f-mt-max-72`.

You can check the theme in [theme.ts](./src/theme.ts).

You can disable the theme by passing the option `disableTheme` to the preset and adding your own shortcuts.

### Options

Check the interface [`FluidSizingOptions`](./src/index.ts) for the full list of options.

## Aknowledgements

- [UnoCSS Fluid Preset](https://renatomoor.github.io/unocss-preset-fluid/). Uses JS to compute the value like `f-pt-32-64` which results in a limited API.
- [UnoCSS preset quickstart template.](https://github.com/unocss-community/unocss-preset-starter)
