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

You can play with the preset in the [Playground](https://unocss.dev/play/#html=DwEwlgbgBAZgtABzgGwOYD4BQUrAIRxxQCqAzmAHapQAuAFgKZQgMwCGArsjbYwLZMohLDlCRYcGgwAeNOABZpydAAkGATzzAA9OAgjcCKAGNkbUqQC8AInhTZcAIwAObQCY319AHUGyYwD2ArQBvEwACgBODKQMPOFm6qiRARwUIDoIWJjYuAREZJTUfAHRUMlslCYBFDQpyAB0UACCyMhQpOq1bNJQbGVgLLVgxmztwrnAdG4SfHJKEvbz7TA1cgBGAcgg6ACypUwVVYG19TrTBmLQ66hwyQwMFB1gAF4McACsJmYWNvBzcAADAABQHaRxuZzAxyA2FeHR6S56KA3O7RR7PN6fb7mKy2OBzWZyPiUIGgokEnpOSHQ2GA%2BG6SBI8So%2B4Y8hYr6mXF-Ak8f7E0mAikkihwE40SoUBiRIEiqkQ5zy6TitZSmVOOkMxE5UTTCkLOwyZawNZwTbbdDNGh1MDrDg0MAwdTnNzM663BCUADWEg5DBsAD8oKLqUq%2BFS3HD0AimbrcPqBXBDZJjcmVmaLTsAMIAZVzUAAav0wGx1sgGK73SjbqU2FQmP64ABmGYwGwAEj46gg-SgXZ7-QJQv73d7sojKph9JDNE7-0HkW1cdj%2BkwQA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCCMMUwARgK4zDoCeZF1tAKpYIcAL5x0UCCDgByNiIDGVKnIBQ60JFiIUGbKgAKlGjDJVuIFhAA2VcZOmy5AAUUQVVAPRLoqDXU-LCp4dFs2YGQAZWAAL1RBTltgTmo4AF44AG11OBy5GFQADxg5Mmy5dAIYAFoqeICAXSaSPIKAd3LOqJgACzkWtvzKgYq5PtRgIj6yofbKkGx6xu7F5Y7esfklrFrJ6dnB1oW5EABDYpWEtbPL2s3kfu67q4OZuZORs43b3YetsdhgV-tt1nt3kd5t8LlcuuNYQCngNoSD7mDXvsph8gacQNw-ucoERljAIGAXhdicsbIwZLiYcVCdS9rYMGUyHcWbVmDjUZUwEzxmBzshkNgiLU2egOfIRWKJTzDp9gQKCcLReKsJKyRTOfKtZLaWSQAyCmBZQLNYrdWaBSxbgbFcb6fy5GBbI7rdqpey7e6oF6FT7eVCviDLVySXtbW7rMzo7UXaa456EUTE9KVXjA%2BnuaHs99beNY%2BHKsnbhW3VnbjW3QXbg23Q0buNHs9OZDCyCE9h-Xrzd6iP7I6XVXIHeMq2W5GmCnWZ7mCk2Z0RzgPKmuKW6t7UhQU-BEQHst-7d%2BrlxAOrVT-WIIo0MhK9A0FAeaLgGw1NXUB-tbXDCxZURygc4lAAawlWtaCKN8qBFJQoPmJpNG8AAqNC8jQuAADFoDgX8lD6chzmAKAyCIVAcFAoo4HOOAqD6aAYCUDhJHwwjiI4YAUhgbgsO8IICFCchKDQTAcBiBCJSSHjUmAdIslyfJ3XKdp3Q5dSwEnLS0y03N1NNYEzk0lT42MkA9LMgyVNPYzdyFdTzzUlTpAfVAn2Mtk-2HYymDAyD-2Mis-PJFz5BrYyG2MlsAmM%2BF1LGQzlli8LMVSizfkyiE0sRBKzPRNSUKEkJ4H6VAQFQTJEHabxvEkWowFqAAmYoHFqAA%2BBqmv%2BAAObrakRABGZravq9Ab3XFq2rgTqGt3Pr5qm4bRvyOq4FcGhUAQfhxMMKSwJk5J5OoMR2ngw7tQALhq-IVNatQbuyXqyBG8N8jap6RtegA2d6GJAL6frIZqABZ-pAZAnrBsgAGZmv%2B2wiCe%2BGyFB3r-uKWwnvRsgAHYEeBe6sbkJ6CbIABOP6ifkWGSaeqnXuajGabkUH6ZyEaXrgIbQfB1mAFYOeyXnQZBgAGcXwzENoxoaopSmm9quomhW6n%2BCn5ZKdX7iGoa5dV7WpSIfI5sNxX-iGn6tYt3XevaaosBgWIEhuhB2hUunHpyCnXqG-65Ae0nOfFpnMaoL7mte-mPYBr6xZ56nY8hoHfsR5HOeBnmWdjrGvu55rCdjwPhcLkGk7u2nS6z%2BGA-Zz0UajuA%2BeltozpKkSiFsCAWHOWx8EIaZqqQWEB5gUjqIAdS2G6hop5rQ7gXYx4n1AoGn5Ebvhxfe5oYRUhuuQhsFboShFLBkFwaJogANSJYBzhYNkI8kPuaHEABuDv4H4MwcIiKILsJTVT2jgEwAgYAAApIEAH1yScGEsPMQABKTIXV3aVwAG5EjgDA84ZAYEsC-pXYIIkkD8EwMUaqVRajdFHjUVe68thkGXgwwwTDkRkHEucNgtgYAACFzh7ywKkMgZ9zgXyvrfe%2Bj9n5cOAFQWRqAAAqkxKrVXQG-VAZBuK8QUi-L8a9ZJ6MUjkVookDDFDwk7F2VUsiwPolkOBFpgDCQAHQUOAMUVBABCDIWQsC8NsHAAAZCE3B9E-FZEwRAKIcBxZwAAPwRLgDdTxxQ%2BCUEocYk6Dh7GEOqs4hBIQPFZK8b4-xcBAm2GCWE3BLA4BRLgDEuJCTkkFLSWUjJjgnHwNcSEYhd0u49z7gPYgbj6FO0YRvfo1VJnj3YTM4iTTqm1PCfM6ZWxGmVJacgeJSSl6XBXosrZN1hm937gQcZGyTnIkGfkc5oyrnTAmdgY5U8tlZFYVM25syVlBNCest5bCPnIm2dE2Jey2lL2BT80FsyzndwuWMl53yFnwr6PcuAjzLmDyIG43eiQRHwCyNw3hAihFEtSOCqpAK6lkr4YI4R1Kmm7P2ckhlFLmXwERSM3F4zCX7xgFinFKL8XiMkdfO%2BzAlF5IIsUc%2Bl8pUyKfukf5NTAXysVVI6VD9VUOFZZC9lWqJFKukTK-VqTsVIqeXitxEqzW6tlVi9a2A4BKEpXACA6B3VXJSEoeAbrdG5J0e-cqcBDGBgcMGtIVBY6kPgJVYkHl-6RBiI0HJsbqqRszforFCaI00CgLm6gAA5c46isg5uOrGiZ65IFsDQRG7IUtkFYuqFAOAkCC3ZBjbwUS5I16xqaF6n14Q022JLVQNxmA%2BFrwbU2nx1a5KxvLZVNx2AlARDQFQBtLamjIMPbdSud0k2UWQKmwBGaa36I8V%2BPokDe01v7RQQdsB9EHqxWdEhwlE1r3PZe9NCQp1rrsUvf9KaAFAcSDe6gdawALoyF1Ng%2B623xt-XAKAvDTFnsgxO69K7b0XAQ4%2BvtmS33DtQUh7FtAABK2Hd0AANIEABIdpdLEGxvtKDGPkbAEO-Rh6Z22HOFAoaaHK5YefnexikC3HycojAejz9IHMbY%2BksQAAdTTLHtMdAANTIMY4e-NGHGLMVYjAOVCAxBYq4F2nx4pFGqtURVVAqCMEnvyB2rtPasAVu0TkXYLDLgtFHXAAA8iwAAVqgAN9qnbMGoJA8q67HbO0aEezzXnK7mdgJZqg2RGPqa6dYjLCQxBq1qGx-zlUxCMZHVkYr7HLGVaNmx3YYhvAdcuPV-IsdK7fpyz57tGHsi1cC9kYLhzihhe9ZFmLcWYAJaYPolLajUBuIuohbUWWBvDfwqN0qEbn3hdwxeqDk7YNUFAzOnisFEPIZpYUbWcg9s5Y%2BwxJi%2BWOCFea%2BkqdnGEDceqwgCb9XGtwH%2Bxxrjz6xCg8691hAsJ6tYo%2B0NrzGPxCx0oDANgUAsDHq8xNw%2BHgvCNVMLQWo46ojXCgjTSTDGGd3TyyxX7NNbPqBQV-AtnK74RDA1bHnGGvDSus8nS4N0%2Bd9zYNo5O2ApcYB4Xw-nsuaaKZm%2B8%2BdHnMO0Hx4T0Vzz8U3IxR-cQ6vaAwqwFrqAkCde4-19avlYrXnW5BWvJZZuZaxw14oVIdu9AO4J075FRuCWUqFV7mmoFtSoCWTddyEkPI000QG6ACeL4GEktHiRlFbEZ9Acn2ONOoYRsz0n5ANNYoF6z0Xn9cK16HyGpLJQABHBKnP0CKADf0uAZIADSqBe4sFwJSyBoQoAeZx3r4PE%2B3GUA9GBVAkDvCPvOLUOIB7H10FqAALQPd4Ug8gWNDWq81N7biyQABkrxr1HzQO3X8zpd6wD3ggNGYA6qJKByB2CLVsh0WfSn0kxn0J0Y1qFBz7UyEqVWTgAAB84CTsV1uBoCIVWkDk2UEkE9n159UBF8lBl85AWMXg3sgc-89U2QDlwC2MB8h9H579l9yClFkE%2BtD45BUcud1AX838DdaAv9bcmDVVADkDgC7og8wC-9WMEBFN%2BCf9BCACkDeJuAWC2NRciRCt5DUAR1kleM4BVDVAxdshNCmhWD5B2CjMn8uDu9ikP9%2BDd1NDhClDRD8hxCcgZDlUoA5CVUFC%2B1kEKI%2BCPDf9vDAtfCmhLDuCbDFNAMpFIE%2BlhJnDfVjsoCsg4iSk%2B1cD8DUA6AalIEiCSCJM7oC1yFpB%2BN31qAWFsBbFqp3DzVcjdhuhfCQtigqisgajpU6jLgGigCmjbFcBqiAjajXgbcuiRCKisBej%2BjP9Aifg3cG8lxGiTVJVzUKDTFDc7UHV%2BCViqAyAJAUiXFhJTNjtgh0U15pVJj%2BDcjjjGERinDDiRI-cYAzjWiBj2iFBiUbjUhlC7j4AvAkEsU2R4BsEBdqE5A7MfVIENiPCtiEj68RJsgY9KIllpUyAES48thpVQNIc2j1DcjUSlkPi%2BICivMe1U8yQoBkTX409yTv8AssSXicSqgwIySCSvj9t8ge1UTbEKTOTGgMTaTziPDd05AeTWxFDPiiST0SSoMKSS8%2BTKo6SpjzUhSS8WSJTYT4BshYoKStSaT5SBSlTciMoxTCS0dCjVB4Tc80TkQ5StDqpGMPVbAlApDYReiJBag9DkdKjGhcAeNTT2TzTSToAbTId7S%2B4nSpCrj2FpU3Su0uNiVoy4BsIOsvSEgfSj16o2M8T0SiRfS2T3VzSRTUBgy7SHSnSetmjGgYzkzxjKyLC8yvBshZTdTbSmtSypCHiEykzPSayKs4B9MPTCzOyPTAzqSoBcyPsC0t0K0wASyRNwBu0wz2z4yczEyPTdhbEUEyA2MmyxyyA2y4zUghzyyNzD1GM-T8zCsdTPD%2BSsgpzwBzygTZc7S2MryJAzzY4sdUB7AqpstJSMMS8SzFyDzHiVyuz1zKy%2BzYzkdLgNzZo1yUzUAUFVyIz3dRyYylzDzQL4Key8AUFUF6pnSYLvSqzuzXTTzzyC1dhVcwNQzHSMKQKxzVzqyTz3yJyMNYRqLAK6LgKjzoKKyKs6yPtHyaK7yENqzqKZZhyoNJLyyJLBK7osdX1Sja0O0ABRMCB9Gc6jBssASHYSiU1wrwcI6w3vRTZTZLGBSgcBShPc1QEwCjfRaqbIA9InRIkSKTUxZy743XayrxO0qQyy4wDjeStaeqf4AAHkCWsDXg6lcHCsjOoiRH6A6hxwYxkwfWUhyxwA6DgFo1QCIFUoVVUwAD1MygrWtBplhIFtNkBDNIFEkrpXBqrNNarD1EkWNjNmd8hH0YECEiA3IwBHDPixjbFQ014ABZWFE4jhfoFy6jX8j7VwpAbIbE68yqOovsIawkpoG6cChICoVan-GY4Yra5QnawtCaqazZMFTndHGmT9WOdaf4BKteWoeK1CpKvoFKxnaTMAe9R9PM7K3K-KwqhDRjUqhAKyjjSqvYF6t8Zq1qjqvwvMnqvqga06saqASa2Y6apZOa9BPMkAvHYPZaw6gLDanG64065Bc6yNbGm3JZT%2BPM73SuB6yuJ6%2B4SKtgaKqAWK96uYz676sQtKv62TTK4nVAHKvKgqoq8Gsq3y4oeHREBGuqhqpqmqwzZBdqzqlG7IXq3Bfq%2B8Qa40-tF0xoTG8ao5VCvGqjAmz7MQ0AvQFa%2Bktawg2EVU86s2-atwl2o6k3NeD2hPItS24oBmrZW6nLFmu6Nmu6Dmq4OGt6hO9sL61K36-68Wk9IG6W0Gkq%2BW6GxEBOlW5BJGrqrtPWtGo2jGi6rGq2uYm2ptBanLJan2xUm0jo0O1CwO6ukOsOm688qO-IGOlwkW9OwGyW4GmWsGiGqG1rEulGi4FiSYKgW21yj7ezSBBeoiODNkbUP5SpWGeAxAzepejdV-bdZLRPfaQ9Qmpu0A889Uk2uZUTLewrf2e%2BwojDJSgTUxbtOyko7%2BvJGAgFBAi8%2By5Sxy-xNAqFDAo1LA0B-%2Bso6dHeogfoKjSpaFZ21u5s3Ij2q1LwMBgB9%2Blwx2qIqDGIpAMjAdcB9IbnZm%2B6iU9aaINgMAHQeAGeyhN6qKlgGK7wLmnmrqL5ZYPh7h3m7wREYRmK1OuDUWjKseqWkG2W6e8qyheHIu%2Bqq6VfDWtquej7De5%2Bpelexurzde4%2B7eqiFB5ZSpAWQ%2Bw5ReuDTdc%2B3dS%2BySa%2B%2B2rzcQohtyjU-WmBQ25hquvawLL2ls2xl%2BzxgtL%2BxB6qX%2BqgAhqJyB2lDVEB-BhBrNBJzAmB9Am6FJhysx3evoNBrIDBsm9auQXB7Jv%2B3JqgTx1w0htNchk2ka82mbUaqhgB8QNUhS%2Bhl1eqJhlh5iHyrpTh7mkRvmrhnhiR3muK8Z3muZIRmZrqZ6j6yZxZzmhZmbWoBOlZqR6dGRgGj7LOhRqevOiqou9Wlq1WjRs5ourWnRnLPRux5ehum%2B-IEx-RvJixmlPGGx0x6dBxtgHdBtcvK%2B5BF5k9DxsFntHxvx42yhwJpp1Mno5p4J3ASHX58Jz%2B1JiB3zSp6hwBgJYBxAnJvF1A5pWBzJ6Bip2JrFj51B0l4p328msp6mkdKluJ2NGpkh2gaI6%2BSBCh59Xa956dUTSBcTBFoJoixFlp5FhC3APjdp2hu62OIeuARh5h1hwZkoLxJMSlYZ-hnZ9Kx9Q5ye3OyG5RrxeHQlWoZqgzYuzqsu6F9Gxp3BJQMgbKoVfGrtUmxl0ph4ru914lDplV9aQQd%2BNvHK7AUIX8PZebTBDoA1vZ8bce7OxRk5lRzZ1Ckuh1iu-xk2z1vllu2QpluGruo%2BFvdvOQINgyx2jy6pzg9QM%2BAZzlfQJPMVPl9oX%2BWgF%2BbITtmAYQCAO3TJCBBgVbdgTgHgQdixP%2BS7eICUPlyE5Y2VK6TRb8lBE4FBdQIAA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA&version=65.4.2)

### Utilities

This preset provides a set of utilities for all CSS properties that accept a spacing value like `padding`, `margin`, `gap`, `width` and `font-size`. You need to attach the prefix `f-` to the utility name in order to use it.

#### `f-${utility}-${minValue}/${maxValue}`

Sets the minimum and maximum value for the utility:

- `f-pt-32/64` will set the `padding-top` to `32px` when the screen width is smaller than `64px`.

##### `f-${utility}`, `f-${utility}-min-${minValue}` and `f-${utility}-max-${maxValue}`

Same as above but more explicit.

```html
<div class="f-pt f-pt-min-32 f-pt-max-64"></div>
```

- `f-pt-min-32` will set the `padding-top` to `32px`.
- `f-pt-max-64` will set the `padding-top` to `64px`.

> If using `Attributify preset` remember to add the self referencing char(`~`) to the utility attribute like `f-pt="~ min-32 max-64"`. Same as `flex` or `grid` attributes.

#### `f-${utility}-min-container`

Sets the minimum screen width for the utility. By default it is `320px`. You can change it with the option `minContainerWidth` in the preset.

#### `f-${utility}-max-container`

Sets the maximum screen width for the utility. By default it is `1920px`. You can change it with the option `maxContainerWidth` in the preset.

#### `f-${utility}-container`

Instead of using `100vw` to compute the value, it uses `100cqw` which is the width of the closest container.

#### `f-base-${baseValue}`

> [!WARNING]
> This utility is experimental and may not work as expected.

Sets the base unit for the utility which by default is `1px`. You can also change the default base unit by passing the option `defaultBaseUnit` to the preset. See [CSS Units](./src/index.ts) for more information.

#### CSS Variables

You can also use `$` to store the calculation of the fluid size in a CSS variable. For example `f-$myvar f-$myvar-min-8 f-$myvar-max-12` will set the padding to the value of the CSS variable `--myvar`. Then you can use the CSS variable in your CSS like `--other-value: calc(var(--f-myvar) * 1.5);`.

> [!WARNING]
> Due to limitations, the name of the variable can only contain letters, but not numbers nor dashes.
> ✅ `f-$myvar` is correct.
> ❌ `f-$my-var` is not.

### Theme

By default the preset includes a theme with predefined values for spacing and font sizes that I have been using in my projects and in general is what you will need. This will save you time as you can do `f-p-2xs` instead of `f-p f-p-min-8 f-p-max-12` or `f-mt-lg` instead of `f-mt-min-48 f-mt-max-72`.

You can check the theme in [theme.ts](./src/theme.ts).

You can disable the theme by passing the option `disableTheme` to the preset and adding your own shortcuts.

### Options

Check the interface [`FluidSizingOptions`](./src/index.ts) for the full list of options.

## Aknowledgements

- [UnoCSS Fluid Preset](https://renatomoor.github.io/unocss-preset-fluid/). Uses JS to compute the value like `f-pt-32-64` which results in a limited API.
- [UnoCSS preset quickstart template.](https://github.com/unocss-community/unocss-preset-starter)
