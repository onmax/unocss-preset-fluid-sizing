import type { DynamicRule, Preset } from '@unocss/core'
import { definePreset } from '@unocss/core'
import { predefinedSpacingUtilities, theme } from './theme'
import { fluidSizeUtilities } from './utilities'

export interface FluidSizingOptions {
  /**
   * Default minimum screen width
   *
   * @default 320
   */
  minContainerWidth?: number

  /**
   * Default maximum screen width
   *
   * @default 1920
   */
  maxContainerWidth?: number

  /**
   * Default base unit
   * @default 1px
   */
  defaultBaseUnit?: string

  /**
   * Prefix for custom properties
   * @default f
   */
  varPrefix?: string

  /**
   * Include shortcuts prefix
   * @default true
   */
  includeShortcutsPrefix?: boolean

  /**
   * Expand CSS variables
   * @default false
   */
  expandCSSVariables?: boolean

  /**
   * Disables default theme
   * @default false
   */
  disableTheme?: boolean
}

export const presetFluidSizing = definePreset((_options: FluidSizingOptions = {}) => {
  const {
    maxContainerWidth = 1920,
    minContainerWidth = 320,
    defaultBaseUnit = '1px',
    varPrefix = 'f',
    includeShortcutsPrefix = true,
    expandCSSVariables = false,
    disableTheme = false,
  } = _options
  const cssVarPrefix = `--${varPrefix}`

  const rules: Preset['rules'] = []

  const cssVar = (value: string, defaultValue?: string) => {
    const varName = `${cssVarPrefix}-${value}`
    return [varName, `var(${varName}, ${defaultValue ?? ''})`]
  }

  for (const [utility, properties] of fluidSizeUtilities) {
    const rePrefix = `(?:${varPrefix}(c)?-${utility})`
    const [minVarName, minVar] = cssVar('min')
    const [maxVarName, maxVar] = cssVar('max')
    const [minCVarName, minCVar] = cssVar('min-container', `${minContainerWidth}`)
    const [maxCVarName, maxCVar] = cssVar('max-container', `${maxContainerWidth}`)
    const [unitVarName, unitVar] = cssVar('unit', defaultBaseUnit)
    const [rangeWidthVarName, rangeWidthVar] = cssVar(`range-width-${utility}`)
    const [factorVarName, factorVar] = cssVar(`factor-${utility}`)
    const [rangeSizeVarName, rangeSizeVar] = cssVar(`range-size-${utility}`)
    const [fluidVarName, fluidVar] = cssVar(`fluid-${utility}`)
    const [sizeVarName, sizeVar] = cssVar(`size-${utility}`)

    rules.push([
      new RegExp(`^${rePrefix}-min-(\\d+)(?:\\/(\\d+))?$`),
      ([_, _c, minSize, userMinContainerWidth]) => {
        return { [minVarName]: minSize, [minCVarName]: userMinContainerWidth }
      },
    ] satisfies DynamicRule)
    rules.push([
      new RegExp(`^${rePrefix}-max-(\\d+)(?:\\/(\\d+))?$`),
      ([_, _c, maxSize, userMaxContainerWidth]) => {
        return { [maxVarName]: maxSize, [maxCVarName]: userMaxContainerWidth }
      },
    ] satisfies DynamicRule)
    rules.push([
      new RegExp(`^${rePrefix}$`),
      ([_, container], { symbols }) => {
        const css: Record<any, string> = {
          [symbols.parent]: container ? `@container (min-width: var(${minCVar}))` : undefined,
        }

        if (expandCSSVariables) {
          css[rangeWidthVarName] = `calc(${maxCVar} - ${minCVar})`
          css[factorVarName] = `calc((100${container ? 'cqw' : 'vw'} - (${unitVar} * ${minCVar})) / ${rangeWidthVar})`
          css[rangeSizeVarName] = `calc(${maxVar} - ${minVar})`
          css[fluidVarName] = `calc(${unitVar} * ${minVar} + ${rangeSizeVar} * ${factorVar})`
          css[sizeVarName] = `clamp(calc(${unitVar} * ${minVar}), ${fluidVar}, calc(${unitVar} * ${maxVar}))`
          properties.forEach(property => css[property] = `${sizeVar}`)
        }
        else {
          const factor = `((100${container ? 'cqw' : 'vw'}) - (${unitVar} * ${minCVar})) / (${maxCVar} - ${minCVar})`
          const fluid = `calc(${unitVar} * ${minVar} + (${maxVar} - ${minVar}) * ${factor})`
          const minValue = `calc(${unitVar} * ${minVar})`
          const maxValue = `calc(${unitVar} * ${maxVar})`
          const value = `clamp(${minValue}, ${fluid}, ${maxValue})`
          Object.assign(css, Object.fromEntries(properties.map(property => [property, value])))
        }
        return css
      },
    ])
    rules.push([new RegExp(`^${rePrefix}-base-(\\w+)$`), ([_, _c, newUnit]) => ({ [unitVarName]: newUnit })])
  }

  const shortcuts: Preset['shortcuts'] = []

  if (!disableTheme) {
    for (const [name, [min, max]] of Object.entries(theme.fontSize)) {
      for (const [utility] of predefinedSpacingUtilities) {
        shortcuts.push([`f-text-${name}`, `f-${utility} f-${utility}-min-${min} f-${utility}-max-${max}`])
      }
    }

    const getShortcut = (utility: string, min: number, max: number) => ({ [`${includeShortcutsPrefix ? `${varPrefix}-` : ''}${utility}`]: `f-${utility} f-${utility}-min-${min} f-${utility}-max-${max}` })
    for (const [name, [min, max]] of Object.entries(theme.spacing)) {
      for (const [utility] of predefinedSpacingUtilities) {
        shortcuts.push(getShortcut(`${utility}-${name}`, min, max))
      }
    }
  }

  return {
    name: 'unocss-preset-fluid-sizing',
    rules,
    shortcuts,
  }
})
