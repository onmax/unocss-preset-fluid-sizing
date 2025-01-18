import type { DynamicRule, Preset } from '@unocss/core'
import { definePreset } from '@unocss/core'
import { theme } from './theme'
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

  const defaultValue = 16

  for (const [utility, properties] of fluidSizeUtilities) {
    const rePrefix = `(?:${varPrefix}-${utility})`
    const [minVarName, minVar] = cssVar('min', `${defaultValue}`)
    const [maxVarName, maxVar] = cssVar('max', `${defaultValue}`)
    const [minCVarName, minCVar] = cssVar('min-container', `${minContainerWidth}`)
    const [maxCVarName, maxCVar] = cssVar('max-container', `${maxContainerWidth}`)
    const [unitVarName, unitVar] = cssVar('unit', defaultBaseUnit)
    const [rangeWidthVarName, rangeWidthVar] = cssVar(`range-width-${utility}`)
    const [factorVarName, factorVar] = cssVar(`factor-${utility}`)
    const [rangeSizeVarName, rangeSizeVar] = cssVar(`range-size-${utility}`)
    const [fluidVarName, fluidVar] = cssVar(`fluid-${utility}`)
    const [sizeVarName, sizeVar] = cssVar(`size-${utility}`)
    const [containerVarName, containerVar] = cssVar(`container`, '100vw')

    interface FluidCSS {
      minSize?: string
      minSizeC?: string
      maxSize?: string
      maxSizeC?: string
    }
    function getFluidCSS(options: FluidCSS = {}) {
      const { minSize, maxSize, maxSizeC, minSizeC } = options
      const resolvedMinSize = minSize || minVar
      const resolvedMaxSize = maxSize || maxVar
      const resolvedMinC = minSizeC || minCVar
      const resolvedMaxC = maxSizeC || maxCVar

      const css: Record<any, string> = {}
      if (expandCSSVariables) {
        css[rangeWidthVarName] = `calc(${resolvedMaxC} - ${resolvedMinC})`
        css[factorVarName] = `calc((${containerVar} - (${unitVar} * ${resolvedMinC})) / ${rangeWidthVar})`
        css[rangeSizeVarName] = `calc(${resolvedMaxSize} - ${resolvedMinSize})`
        css[fluidVarName] = `calc(${unitVar} * ${resolvedMinSize} + ${rangeSizeVar} * ${factorVar})`
        css[sizeVarName] = `clamp(calc(${unitVar} * ${resolvedMinSize}), ${fluidVar}, calc(${unitVar} * ${resolvedMaxSize}))`
        properties.forEach(p => css[p] = `${sizeVar}`)
      }
      else {
        const fluid = `calc(${unitVar} * ${resolvedMinSize} + (${resolvedMaxSize} - ${resolvedMinSize}) * (${containerVar} - (${unitVar} * ${resolvedMinC})) / (${resolvedMaxC} - ${resolvedMinC}))`
        const minValue = `calc(${unitVar} * ${resolvedMinSize})`
        const maxValue = `calc(${unitVar} * ${resolvedMaxSize})`
        const value = `clamp(${minValue}, ${fluid}, ${maxValue})`
        properties.forEach(p => css[p] = value)
      }
      return css
    }

    // min-<number>@<container-width>
    rules.push([
      new RegExp(`^${rePrefix}-min-(\\d+)(?:@(\\d+))?$`),
      ([_, minSize, userMinContainerWidth]) => {
        return { [minVarName]: minSize, [minCVarName]: userMinContainerWidth }
      },
    ] satisfies DynamicRule)

    // min-container-<container-width>
    rules.push([
      new RegExp(`^${rePrefix}-min-container-(\\d+)$`),
      ([_, userMinContainerWidth]) => {
        return { [minCVarName]: userMinContainerWidth }
      },
    ] satisfies DynamicRule)

    // max-<number>@<container-width>
    rules.push([
      new RegExp(`^${rePrefix}-max-(\\d+)(?:@(\\d+))?$`),
      ([_, maxSize, userMaxContainerWidth]) => {
        return { [maxVarName]: maxSize, [maxCVarName]: userMaxContainerWidth }
      },
    ] satisfies DynamicRule)

    // max-container-<container-width>
    rules.push([
      new RegExp(`^${rePrefix}-max-container-(\\d+)$`),
      ([_, userMaxContainerWidth]) => {
        return { [maxCVarName]: userMaxContainerWidth }
      },
    ] satisfies DynamicRule)

    rules.push([
      new RegExp(`^${rePrefix}$`),
      () => getFluidCSS(),
    ])
    // Support rePrefix-<number>/<number> = min-<number>/max-<number>
    rules.push([
      new RegExp(`^${rePrefix}-(\\d+)(?:/(\\d+))?$`),
      ([_, minSize, maxSize]) => getFluidCSS({ minSize, maxSize }),
    ])

    // Support rePrefix-<number>@<number>/<number>@<number> = min-<number> min-container-<number> max-<number> max-container-<number>
    rules.push([
      new RegExp(`^${rePrefix}-(\\d+)@(\\d+)\/(\\d+)@(\\d+)$`),
      ([_, minSize, minSizeC, maxSize, maxSizeC]) => getFluidCSS({ minSize, maxSizeC, maxSize, minSizeC }),
    ])

    // Support rePrexix-base-<number>
    rules.push([new RegExp(`^${rePrefix}-base-(\\w+)$`), ([_, _c, newUnit]) => ({ [unitVarName]: newUnit })])

    // Use cqw instead of vw
    rules.push([new RegExp(`^${rePrefix}-container$`), () => ({ [containerVarName]: '100cqw' })])
  }

  const shortcuts: Preset['shortcuts'] = []

  if (!disableTheme) {
    for (const [name, [min, max]] of Object.entries(theme.fontSize)) {
      shortcuts.push([`f-text-${name}`, `f-text-${min}/${max}`])
    }

    const getShortcut = (utility: string, name: string, min: number, max: number) => ({ [`${includeShortcutsPrefix ? `${varPrefix}-` : ''}${utility}-${name}`]: `f-${utility}-${min}/${max}` })
    for (const [name, [min, max]] of Object.entries(theme.spacing)) {
      for (const utility of fluidSizeUtilities.map(u => u[0]).filter(u => u !== 'text')) {
        shortcuts.push(getShortcut(utility, name, min, max))
      }
    }
  }

  return {
    name: 'unocss-preset-fluid-sizing',
    rules,
    shortcuts,
  }
})
