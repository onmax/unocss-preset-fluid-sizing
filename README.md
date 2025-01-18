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

### Playground

You can play with the preset in the [Playground](https://unocss.dev/play/#html=DwEwlgbgBAZgtABzgGwOYD4BQUrAIRxxQCqAzmAHapQAuAFgKZQgMwCGArsjbYwLZMohLDlCRYcGgwAeNOABZpyCUmml0ACQYBPPMAD04CFmy4CRMpWp8A9gCcmqO20pQAxjYo07N5ADooAEFkZVJtLzZpKDYHKDAWLzA3NmVhU2A6ACYJPjklCSlZOHyYTzkAI18QdABZe0dnVw8vH2QDLJFcIyhy1DgnBgYKKHIALwY4AFZ3ZDZSUgBeACJ4XLgABgABdf0ARkyADk3d9dOl9AMjTrFoXv6HIZGwcamZucWVuFycuT5KDe2Py%2BkTg%2ByOJzOF0MkGu3TuA0eYwm0zcs3my1WPExX3%2B6yBfwocGaNBcFAYdg2%2BJBYKp0iJZVJ5NBp3W50uMMwnNE5iCNG8YHKHBoYBg2igthYQjg1yyQJKkhkeWUpS8cEqyGqgT5dgFQpF2namVh4juCEoAGsJEjlgA-cX-Gl8EGZM5W55MeBInGEmme93Auku9ZQq6YdnGTBAA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCCMMUwARgK4zDoCeZF1tAKpYIcAL5x0UCCDgByNiIDGVKnIBQ60JFiIUGbKgAKlGjDJVuIFhAA2VcZOmy5AAUUQVVAPRLoqDXU-LCp4dFs2YGQAZWAAL1RBTltgTmo4AF44AG11OBy5GFQADxg5Mmy5dAIYAFoqeICAXSaSPIKAd3LOqJgACzkWtvzKgYq5PtRgIj6yofbKkGx6xu7F5Y7esfklrFrJ6dnB1oW5EABDYpWEtbPL2s3kfu67q4OZuZORs43b3YetsdhgV-tt1nt3kd5t8LlcuuNYQCngNoSD7mDXvsph8gacQNw-ucoERljAIGAXhdicsbIwZLiYcVCdS9rYMGUyHcWbVmDjUZUwEzxmBzshkNgiLU2egOfIRWKJTzDp9gQKCcLReKsJKyRTOfKtZLaWSQAyCmBZQLNYrdWaBSxbgbFcb6fy5GBbI7rdqpey7e6oF6FT7eVCviDLVySXtbW7rMzo7UXaa456EUTE9KVXjA%2BnuaHs99beNY%2BHKsnbhW3VnbjW3QXbg23Q0buNHs9OZDCyCE9h-Xrzd6iP7I6XVXIHeMq2W5GmCnWZ7mCk2Z0RzgPKmuKW6t7UhQU-BEQHst-7d%2BrlxAOrVT-WIIo0MhK9A0FAeaLgGw1NXUB-tbXDCxZURygc4lAAawlWtaCKN8qBFJQoPmJpNG8AAqNC8jQuAADFoDgX8lD6chzmAKAyCIVAcFAoo4HOOAqD6aAYCUDhJHwwjiI4YAUhgbgsO8IICFCchKDQTAcBiBCJSSHjUmAdIslyfJ3XKdp3Q5dSwEnLS0y03N1NNYEzk0lT42MkA9LMgyVNPYzdyFdTzzUlTpAfVAn2Mtk-2HYymDAyD-2Mis-PJFz5BrYyG2MlsAmM%2BF1LGQzlli8LMVSizfkyiE0sRBKzPRNSUKEkJ4H6VAQFQTJEHabxvEkWowFqAAmYoHFqAA%2BBqmv%2BAAObrakRABGZravq9Ab3XFq2rgTqGt3Pr5qm4bRvyOq4FcGhUAQfhxMMKSwJk5J5OoMR2ngw7tQALhq-IVNatQbuyXqyBG8N8jap6RtegA2d6GJAL6frIZqABZ-pAZAnrBsgAGZmv%2B2wiCe%2BGyFB3r-uKWwnvRsgAHYEeBe6sbkJ6CbIABOP6ifkWGSaeqnXuajGabkUH6ZyEaXrgIbQfB1mAFYOeyXnQZBgAGcXwzENoxoaopSmm9quomhW6n%2BCn5ZKdX7iGoa5dV7WpSIfI5sNxX-iGn6tYt3XevaaosBgWIEhuhB2hUunHpyCnXqG-65Ae0nOfFpnMaoL7mte-mPYBr6xZ56nY8hoHfsR5HOeBnmWdjrGvu55rCdjwPhcLkGk7u2nS6z%2BGA-Zz0UajuA%2BeltozuCET%2BDMHCIiiF2JWqvacBMAQYAACjHgB9clOGE6qEDEABKTIuvdyuO-gJBYXwJ3SOogB1LZqqGinmtDuBdh3mA99QKBD%2BRar4fP8TzjYWwYAAIXOGhhFSaq5CGoKboAA3IkI9MDFH-ugbo2AlARDQNEJisBWIwCoOA4AkCshMDYKgMgJQRRYGQLgaI0QABqRJgDnBYGyBwWR0DnHsLglAwAqBULZAAFUmJVaq9DGFkAkFkaeFpgDCQANyxw3nALw5CoDoMwXAAABrUWoAASBAoDZGUAgWIBR4j17CXgFAN%2BikchND0XdSR0iiTVTHqAiITCX5vxgOQ%2Bxy8Mir1jvo0qcANEADlzjcKyAotRVjNEGGKGIVR6iGE4J0eYyu%2BRKAwDYFALAOQ-EBKYQojRY81EZMqjLOAajHHvxcTguAABCDIWQsBv1sHAAAZA0-Q9CnFlKqlUrIwCIBRDgOLOAAB%2BFpr9SkxKqjdOQcgl4KLMbHMQ8SpEGOGW0sZx8foLOqFAOAY9JHZG4rxXgolyS3zSFQJocAIDoEkL3GIjRZK8QUlQZea8En5EkZQOR1UFFjwGVdPJYCtEYMiWo-ZqRuDTIWV4kS2RdgyP8ZVMgsKiTnKyKEsePwsDdGCQgEpzixk6MXpCixSyYWXDhZkxFZLkXVTRa8LFxSMAjLxfYglRK3kksvuShFF9sC4BkSiqRqgZHov%2BMEa%2BhglzYsvjUG%2Bd8tiss8cS7xpLih8qJPCph29%2BU0qFUSEV9wxWyvpQgbeMqJX336Aq157LlWKFSFyphdq8VQAFbSp13RcVfx-lgVIhLFU2uhaBbUqALV9AdWQINlFQ3atRbqqAY8FGRtQEifoUTQV8Stda3Z9ClBkigOGyQYE80xsFVQYVCic15rTcdDNCi-XWsWcqpNLtUAFubY0EtaLE3nGDdcZNIKa3grrWyxt0LwiRGQAW8dURO1xoTdO5A1a5K1vrVmklsUC0bupbGsteqFGxSXQczNrzdmGolQWs91FZ27vjQoy9t8FGciGpLYBXRV2vPQIoXNIi0mURgD3CdxDohjxnj%2B2hiAl63QbUqkSW9sAtspcUBDF9LgttwIi%2BDjRcCOCyKBsR-qEnvOoHYYBHkACymGEjVV2C2uAAAfOjPKsAyJHVCwxxHbCkeQGR1DjRqO8aowxlDxQWMEbY3AUwJHyO8uo5RvA9HGOcqJKxmD7GqBSe45cbDWRYRoYU8JtVUAVMBvgF4ee8yxN3S4Ns-BPaiEkJkZQ6h1BnmWZPaobISbo3qsyQKu9DClC5IQJJzj5GtMSFqEU4LHGuMUawLgCFbnCMecrdAB1fmlABYniEs1V6iQRe2SCn1zqJDYTUSF2LvKl7L3quVntUatgyMS9BrNHn20JHS18zLthAvlZi2FpDjQCt9fU6F7jcnmsteS1QbIC7OtBO671hATqmtwDK9F0blWsAtokAAaii%2B11t%2BW1tRdS-m-Li9dFJfXh5rdUANUZdsAEsAOystFftcd9bFXpPbaG4vMgai5v5bIItoLK3PsHf65pwbCRqtXamwkigxzYCPIAHSbIAKJgT6GPMAK9S3ZDAH5tRd3j3QbOgj1AjCoMI5M9cidXW3vLeK6tr7UO4s7bgPtoL33oec8iyNjTHO-snaC-e87UACtg5ZxDwXY24sJcXjVwrG2hfhdmpDzbP3FeXeM4RpZSL7GM569Lj7kuTty62zt3X13VPCfacbpb4Pzds613zv78Pad07seUhbT3wBBcN7EgHCAF2FLUbCdpk2vdI7ACctHmPse4-x14QnAqfeoHfeTpLSSUlpK8COin1r1r-AADy1OsLfDqrhS-i5TX0DqBGjE0NR2AL8OPlJTZwB0OAAAlVARAMfFBewogAen1uRkT-hjwADoz%2BQLtxePyrquFn-Pxfi8BkqLrTTBtY9siTww79hIZAvy3wV7l2%2BoamhuI8V7xJtA896BhdgdLN0aONAqEp%2B7vmbpn6gBfrvOakfBZgjjLARjfiOiXssHXrXpfm%2BO2A3k3sYlQK3u3vvklt3n3gPkPiPuPtFpPoNDAfAbUGvgvovNvv9klvvofnAP-oAeKgfFsDfvji8l7rnqks-t-g9n-jQAAbyvAaGuIHruAQ2pAQRiXvcOXmwJXlANXnAUAdRPXo3g2s3tQGgYxBgQjlgf3oPsPgmvgR8oChEoNPcGQYvsvqvnPuQZvpQbvtajQYhshvQVpoIcwbfjTrThwWkkgCqm-sJshiqoZjwXQXwTxqqm4Q-KAVNqIdauIQ2pIVcLAXXogSodamoagW3poZ3i1joTgfoWPhPsYVPgaiQeYRQTvtQQfqfmEa4YoVfu4awbbg-skpwb4Vqj5pVE0LwefnUYwQ0VESIfYfkPEekSgRoR3pgagD3robgQYUUeEmIHYdQR4X%2BgBlEEBmPFQWIVnpXOtNEGwGADoOxnIrUNIbIR1N4OcSwFXrJnsNcVXt4IiA8XIcgS3lkZMdodMdgXoXgQsdoqQdYRYb8t4OUbYZUQjo4Uxshrpo0Cwe4nAGsTcpsXBsfpqgJlVEvMMXAKMa8vsYcccRJsYMYWcRXjcXITXmSY8S8fIVSXIXcaSTIeSV1KKiQTScJoyRcRybAXSWka8hkRMVoV3t8bMQUYYcSYsYCevovFYdKTPqCUCTKeUcsZCdUdCZ-uqQkOhgERqbCVqfCV1EiYBiQmPKiTCRidqXqZqnJthliRAbsXdPiUccxESSPMUBgkmN-MmjSW8eoR8fvnkb8fMQQcUZ6TQFKR0IvnYdsmqZPEoGQN3r-DAAadsr4c7iEYmcVuIIvLiQkutIIDQFIgAI497YChC-jIAXJXKvq%2BmZHoHZCBlzGFEhmSni7RlbH46mk5Di7%2BEAKSxKAllyDZm5lF506MTMQoLgbZCzKVzWZjwVLiisLOacIVSZ6eGVybLbK7JYAUo5C7CIYtBVlwAADyLAAAVqgLmqjlREwI8mPOVJVOjjUC2kruudauOcghwHWdkRWrUGrFEjuQUo%2BooubHUBHtgGIN4BHpcDormZXKOfrt4n%2BoghOWxFkGPOmocoBdaVgIhh4V2dkNirAvAqgChZ%2Bagp8kMtihooQQonABMlMgOsuuCgBZkrBTdL%2BUxUelErsJBdBREnRUvCOpuTsiSthV-tgAeecpcieeeZeTANeU7MwNQPeVwqgKjhdIhNqK%2BWwdBiJZIphUeQui2vcidKgRcC9mwPjmwNkFLIvOjjxLBBhdZZUtUvIGrHIDpc0QxEgixF%2BYKchb5SghhYOgmbufucJkriIQRghQhd4W%2BfkNhRMh4F4I1KYLQLUAutcFBNiRkdiR%2BX5agjTBZkJZoPgi6bii0oYDvMQKae0BkU9JUKxKEDIDyMYt0EgIeNABMmJEOWIKiAVZOW7MXM1SaPUEFRwMHIUEbEjHAP%2BdAPVlVExKRlAFdP%2BUUAwuFLEV3LQBHDkDtTAMIBAFsXwOlfQIwMwOwJwDwCdaJKPOsbcnEBKKabZoQkBo5mwtQFdLwjQEvCcEvOoEAA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA&version=65.4.2)

### Utilities

This preset provides a set of utilities for all CSS properties that accept a spacing value like `padding`, `margin`, `gap`, `width` and `font-size`. You need to attach the prefix `f-` to the utility name in order to use it.

#### `f-${utility}`

Sets the formula to compute the value for the give utility.

This utilitiy is mandatory.

#### One utility: `f-${utility}-${minValue@minScreenWidth}/${maxValue@maxScreenWidth}`

Sets the minimum and maximum value for the utility:

- `f-pt-32/64` will set the `padding-top` to `32px` when the screen width is smaller than `64px`.
- `f-pt-32@640/64@1440` will set the `padding-top` to `32px` when the screen width is smaller than `640px` and `64px` when the screen width is greater than `1440px`.

> Using `@screenWidth` is optional. You can also modify the `minContainerWidth`/`maxContainerWidth` options in the preset.

##### Multiple utilities: `f-${utility}-min-${minValue}` and `f-${utility}-max-${maxValue}`

Sets the minimum and maximum value for the utility:

- `f-pt-min-32` will set the `padding-top` to `32px` when the screen width is smaller than `320px`.
- `f-pt-max-64` will set the `padding-top` to `64px` when the screen width is greater than `1920px`.

> If using `Attributify preset` remember to add the self referencing char(`~`) to the utility attribute like `f-pt="~ min-32 max-64"`. Same as `flex` or `grid` attributes.

If you need to modify the sceen width you can use it with `@`, use `min-container-<container-width>`/`max-container-<container-width>` or change the global config:

- `f-pt-min-32@640` will set the `padding-top` to `32px` when the screen width is smaller than `640px`.
- `f-pt-max-48@1440` will set the `padding-top` to `48px` when the screen width is smaller than `1440px`.
- `f-pt-min-screen-640` will set the min container  width to `640px`.
- `f-pt-max-screen-1440` will set the max container width to `1440px`.
- Globallyby passing the option `minContainerWidth`/`maxContainerWidth` to the preset.

#### `f-${utility}-container`

Instead of using `100vw` to compute the value, it uses `100cqw` which is the width of the closest container.

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
