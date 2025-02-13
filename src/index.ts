import type { DynamicRule, Preset } from '@unocss/core'
import { definePreset } from '@unocss/core'
import { theme } from './theme'
import { fluidSizeUtilities } from './utilities'

// The value of the `unit` CSS variable is a string. e.g. f-mt-rem
enum Unit {
  px = 'px',
  rem = 'rem',
  em = 'em',
  vw = 'vw',
  vh = 'vh',
  vmin = 'vmin',
  vmax = 'vmax',
  fr = 'fr',
  percent = '%',
}

const units = Object.entries(Unit).map(([key]) => key).join('|')
const unitToNumberMap = { [Unit.px]: `1px`, [Unit.rem]: `1rem`, [Unit.em]: `1em`, [Unit.vw]: `1vw`, [Unit.vh]: `1vh`, [Unit.vmin]: `1vmin`, [Unit.vmax]: `1vmax`, [Unit.fr]: `1fr`, percent: `1%` }
const unitToNumber = (unit: keyof typeof unitToNumberMap) => unitToNumberMap[unit]

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
   * @default px
   */
  defaultBaseUnit?: Unit

  /**
   * Prefix for custom properties and utilities
   * @default "f-"
   */
  prefix?: string

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

  /**
   * User's Utilities. In case of missing utilities you can add a list of your own.
   * But also you can open a PR to add the missing utilities ;)
   * @default []
   */
  utilities?: [string, string[]][]
}

const globalConfig = { maxContainerWidth: 1920, minContainerWidth: 320, baseUnit: unitToNumberMap[Unit.px], expandCSSVariables: false }

export const presetFluidSizing = definePreset((_options: FluidSizingOptions = {}) => {
  const {
    prefix = 'f-',
    maxContainerWidth,
    minContainerWidth,
    defaultBaseUnit,
    expandCSSVariables,
    disableTheme = false,
    utilities: userUtilities = [],
  } = _options

  globalConfig.maxContainerWidth = maxContainerWidth ?? globalConfig.maxContainerWidth
  globalConfig.minContainerWidth = minContainerWidth ?? globalConfig.minContainerWidth
  globalConfig.baseUnit = unitToNumberMap[defaultBaseUnit as keyof typeof unitToNumberMap] ?? globalConfig.baseUnit
  globalConfig.expandCSSVariables = expandCSSVariables ?? globalConfig.expandCSSVariables

  // in case of conflict in utilities, use the user's utilities
  const mergedFluidSizeUtilities = userUtilities
  const userUtilitiesName = userUtilities.map(u => u[0])
  for (const [utility, properties] of fluidSizeUtilities.filter(u => !userUtilitiesName.includes(u[0]))) {
    mergedFluidSizeUtilities.push([utility, properties])
  }
  const mergedFluidSizeUtilitiesName = mergedFluidSizeUtilities.map(u => u[0])

  const rules: Preset['rules'] = mergedFluidSizeUtilities.map(([utility, properties]) => getRules(`(${prefix}${utility})`, properties)).flat(1)
  rules.push(...getRules(`(${prefix}\\$\\w+)`))

  const shortcuts: Preset['shortcuts'] = {}

  if (!disableTheme) {
    for (const [name, [min, max]] of Object.entries(theme.fontSize)) {
      shortcuts[`${prefix}text-${name}`] = `${prefix}text-${min}/${max}`
    }

    for (const [name, [min, max]] of Object.entries(theme.borderRadius)) {
      shortcuts[`${prefix}rounded-${name}`] = `${prefix}rounded-${min}/${max}`
    }

    const ignoredProperties = ['text', 'rounded']
    for (const [name, [min, max]] of Object.entries(theme.spacing)) {
      for (const utility of mergedFluidSizeUtilitiesName.filter(u => !ignoredProperties.includes(u))) {
        shortcuts[`${prefix}${utility}-${name}`] = `${prefix}${utility}-${min}/${max}`
      }
    }
  }

  return {
    name: 'unocss-preset-fluid-sizing',
    rules,
    shortcuts,
  }
})

const defaultValue = 16

const cssVars = {
  max: defaultValue,
  min: defaultValue,
  get maxContainer() { return globalConfig.maxContainerWidth },
  get minContainer() { return globalConfig.minContainerWidth },
  get unit() { return globalConfig.baseUnit },
  rangeWidth: undefined,
  factor: undefined,
  rangeSize: undefined,
  fluid: undefined,
  size: undefined,
  container: '100vw',
}

function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function getCSSVarName(variable?: keyof typeof cssVars | string, utility?: string) {
  return `--${utility?.replace('$', '')}${variable ? `-${toKebabCase(variable)}` : ''}`
}

function getCSSVar(variable: keyof typeof cssVars, utility?: string) {
  return `var(${getCSSVarName(variable, utility)}${cssVars[variable] ? `, ${cssVars[variable]}` : ''})`
}

function getCSSVars(variable: keyof typeof cssVars, utility?: string) {
  return [getCSSVarName(variable, utility), getCSSVar(variable, utility)]
}

interface FluidCSS {
  utility: string
  properties: string[]
  expandCSSVariables?: boolean
  minSize?: string
  minSizeC?: string
  maxSize?: string
  maxSizeC?: string
}

function getFluidCSS(options: FluidCSS) {
  const utility = options.utility.replaceAll('$', '')
  const {
    properties,
    minSize = getCSSVar('min', utility),
    maxSize = getCSSVar('max', utility),
    maxSizeC = getCSSVar('maxContainer', utility),
    minSizeC = getCSSVar('minContainer', utility),
    expandCSSVariables = globalConfig.expandCSSVariables,
  } = options

  const containerVar = getCSSVar('container', utility)
  const unitVar = getCSSVar('unit', utility)

  const css: Record<any, string> = {}
  let value: string = ''

  if (expandCSSVariables) {
    const [rangeWidthVar, rangeWidthVarName] = getCSSVars('rangeWidth', utility)
    const [factorVar, factorVarName] = getCSSVars('factor', utility)
    const [rangeSizeVar, rangeSizeVarName] = getCSSVars('rangeSize', utility)
    const [fluidVar, fluidVarName] = getCSSVars('fluid', utility)
    const [sizeVar, sizeVarName] = getCSSVars('size', utility)
    css[rangeWidthVarName] = `calc(${maxSizeC} - ${minSizeC})`
    css[factorVarName] = `calc((${containerVar} - (${unitVar} * ${minSizeC})) / ${rangeWidthVar})`
    css[rangeSizeVarName] = `calc(${maxSize} - ${minSize})`
    css[fluidVarName] = `calc(${unitVar} * ${minSize} + ${rangeSizeVar} * ${factorVar})`
    const clamp = `clamp(calc(${unitVar} * ${minSize}), ${fluidVar}, calc(${unitVar} * ${maxSize}))`
    css[sizeVarName] = clamp
    value = `${sizeVar} `
  }
  else {
    const fluid = `calc(${unitVar} * ${minSize} + (${maxSize} - ${minSize}) * (${containerVar} - (${unitVar} * ${minSizeC})) / (${maxSizeC} - ${minSizeC}))`
    const minValue = `calc(${unitVar} * ${minSize})`
    const maxValue = `calc(${unitVar} * ${maxSize})`
    value = `clamp(${minValue}, ${fluid}, ${maxValue})`
  }

  properties.forEach(p => css[p] = value)
  return css
}

function getRules(_rePrefix: string, cssProperties: string[] = []) {
  const rules: Preset['rules'] = []
  const rePrefix = `(${_rePrefix})`

  // min-<number>
  rules.push([
    new RegExp(`^${rePrefix}-min-(\\d+)$`),
    ([_, _group, utility, minSize]) => {
      return { [getCSSVarName('min', utility)]: minSize }
    },
  ] satisfies DynamicRule)

  // min-container-<container-width>
  rules.push([
    new RegExp(`^${rePrefix}-min-container-(\\d+)$`),
    ([_, _group, utility, userMinContainerWidth]) => {
      return { [getCSSVarName('minContainer', utility)]: userMinContainerWidth }
    },
  ] satisfies DynamicRule)

  // max-<number>
  rules.push([
    new RegExp(`^${rePrefix}-max-(\\d+)$`),
    ([_, _group, utility, maxSize]) => {
      return { [getCSSVarName('max', utility)]: maxSize }
    },
  ] satisfies DynamicRule)

  // max-container-<container-width>
  rules.push([
    new RegExp(`^${rePrefix}-max-container-(\\d+)$`),
    ([_, _group, utility, userMaxContainerWidth]) => {
      return { [getCSSVarName('maxContainer', utility)]: userMaxContainerWidth }
    },
  ] satisfies DynamicRule)

  rules.push([
    new RegExp(`^${rePrefix}$`),
    (matches) => {
      if (matches.length !== 3 || matches.includes(undefined as any))
        return
      const utility = matches[1]
      const properties = cssProperties?.length === 0 ? [getCSSVarName('', utility)] : cssProperties!
      return getFluidCSS({ utility, properties })
    },
  ])
  // Support rePrefix-<number>/<number> = min-<number>/max-<number>
  rules.push([
    new RegExp(`^${rePrefix}-(\\d+)(?:/(\\d+))?$`),
    (matches) => {
      if (matches.length !== 5 || matches.includes(undefined as any))
        return
      const [_, _group, utility, minSize, maxSize] = matches
      const properties = cssProperties?.length === 0 ? [getCSSVarName('', utility)] : cssProperties!
      return getFluidCSS({ utility, minSize, maxSize, properties })
    },
  ])

  // Support rePrexix-base-<number>
  rules.push([new RegExp(`^${rePrefix}-base-(${units})$`), ([_, _group, utility, newUnit]) => ({ [getCSSVarName('unit', utility)]: unitToNumber(newUnit as keyof typeof unitToNumberMap) })])

  // Use cqw instead of vw
  rules.push([new RegExp(`^${rePrefix}-container$`), ([_, _group, utility]) => ({ [getCSSVarName('container', utility)]: '100cqw' })])

  return rules
}
