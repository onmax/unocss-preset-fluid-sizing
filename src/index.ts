import type { DynamicRule, Preset } from '@unocss/core'
import { glob } from 'node:fs'
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

  /**
   * Enable attributify mode
   * @default false
   */
  attributify?: boolean
}

const globalConfig = { maxContainerWidth: 1920, minContainerWidth: 320, baseUnit: unitToNumberMap[Unit.px], expandCSSVariables: false, prefix: 'f-' }

export const presetFluidSizing = definePreset((_options: FluidSizingOptions = {}) => {
  const {
    prefix,
    maxContainerWidth,
    minContainerWidth,
    defaultBaseUnit,
    expandCSSVariables,
    disableTheme = false,
    utilities: userUtilities = [],
    attributify = false,
  } = _options

  globalConfig.prefix = prefix ?? globalConfig.prefix
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

  const rules: Preset['rules'] = mergedFluidSizeUtilities.map(([utility, properties]) => getRules(utility, properties)).flat(1)
  rules.push(...getCSSVarRules())

  const shortcuts: Preset['shortcuts'] = getShortcuts(mergedFluidSizeUtilitiesName, { attributify, disableTheme })

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
  return `--${globalConfig.prefix}${utility?.replace('$', '')}${variable ? `-${toKebabCase(variable)}` : ''}`
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

function getRules(utility: string, cssProperties: string[] = [], reUtility = `${globalConfig.prefix}${utility}`) {
  const rules: Preset['rules'] = []

  // min-<number>
  rules.push([
    new RegExp(`^${reUtility}-min-(\\d+)$`),
    ([_, minSize]) => {
      return { [getCSSVarName('min', utility)]: minSize }
    },
  ] satisfies DynamicRule)

  // min-container-<container-width>
  rules.push([
    new RegExp(`^${reUtility}-min-container-(\\d+)$`),
    ([_, userMinContainerWidth]) => {
      return { [getCSSVarName('minContainer', utility)]: userMinContainerWidth }
    },
  ] satisfies DynamicRule)

  // max-<number>
  rules.push([
    new RegExp(`^${reUtility}-max-(\\d+)$`),
    ([_, maxSize]) => {
      return { [getCSSVarName('max', utility)]: maxSize }
    },
  ] satisfies DynamicRule)

  // max-container-<container-width>
  rules.push([
    new RegExp(`^${reUtility}-max-container-(\\d+)$`),
    ([_, userMaxContainerWidth]) => {
      return { [getCSSVarName('maxContainer', utility)]: userMaxContainerWidth }
    },
  ] satisfies DynamicRule)

  rules.push([
    new RegExp(`^${reUtility}$`),
    (matches) => {
      if (matches.length !== 1 || matches.includes(undefined as any))
        return
      return getFluidCSS({ utility, properties: cssProperties })
    },
  ])

  // Support rePrefix-base-<number>
  rules.push([new RegExp(`^${reUtility}-base-(${units})$`), ([_, newUnit]) => ({ [getCSSVarName('unit', utility)]: unitToNumber(newUnit as keyof typeof unitToNumberMap) })])

  // Use cqw instead of vw
  rules.push([new RegExp(`^${reUtility}-container$`), ([_, _group, utility]) => ({ [getCSSVarName('container', utility)]: '100cqw' })])

  return rules
}

function getCSSVarRules() {
  const rules: Preset['rules'] = []
  const reUtility = `${globalConfig.prefix}\\$(\\w+)`

  // min-<number>
  rules.push([
    new RegExp(`^${reUtility}-min-(\\d+)$`),
    ([_, utility, minSize]) => {
      return { [getCSSVarName('min', utility)]: minSize }
    },
  ] satisfies DynamicRule)

  // min-container-<container-width>
  rules.push([
    new RegExp(`^${reUtility}-min-container-(\\d+)$`),
    ([_, utility, userMinContainerWidth]) => {
      return { [getCSSVarName('minContainer', utility)]: userMinContainerWidth }
    },
  ] satisfies DynamicRule)

  // max-<number>
  rules.push([
    new RegExp(`^${reUtility}-max-(\\d+)$`),
    ([_, utility, maxSize]) => {
      return { [getCSSVarName('max', utility)]: maxSize }
    },
  ] satisfies DynamicRule)

  // max-container-<container-width>
  rules.push([
    new RegExp(`^${reUtility}-max-container-(\\d+)$`),
    ([_, utility, userMaxContainerWidth]) => {
      return { [getCSSVarName('maxContainer', utility)]: userMaxContainerWidth }
    },
  ] satisfies DynamicRule)

  rules.push([
    new RegExp(`^${reUtility}$`),
    (matches) => {
      if (matches.length !== 2 || matches.includes(undefined as any))
        return
      const properties = [getCSSVarName('', matches[1])]
      return getFluidCSS({ utility: matches[1], properties })
    },
  ])

  // Support rePrefix-base-<number>
  rules.push([new RegExp(`^${reUtility}-base-(${units})$`), ([_, utility, newUnit]) => ({ [getCSSVarName('unit', utility)]: unitToNumber(newUnit as keyof typeof unitToNumberMap) })])

  // Use cqw instead of vw
  rules.push([new RegExp(`^${reUtility}-container$`), ([_, _group, utility]) => ({ [getCSSVarName('container', utility)]: '100cqw' })])

  return rules
}

/**
 * Get shortcuts for the user's utilities
 * 1. Shortcut for `utility-min/max` becomes: `utility utility-min-X utility-max-X`
 * 2. Shortcut for `text-2xs` becomes: `text-min/max`. The values are taken from the theme.
 * 3. Shortcut for `rounded-2xs` becomes: `rounded-min/max`. The values are taken from the theme.
 * 4. Shortcut for the rest of utilities becomes: `utility-min/max`. The values are taken from the theme.
 */
function getShortcuts(utilities: string[], { attributify, disableTheme }: Pick<FluidSizingOptions, 'attributify' | 'disableTheme'>): Preset['shortcuts'] {
  const prefix = globalConfig.prefix

  const shortcuts: Preset['shortcuts'] = utilities.map(utility => [
    new RegExp(`^${prefix}${utility}-(\\d+)/(\\d+)$`),
    ([, min, max]) => `${prefix}${utility} ${prefix}${utility}-min-${min} ${prefix}${utility}-max-${max}`,
  ] as const)

  if (!disableTheme) {
    const getPrefixAttribute = (utility: string) => `${utility}-${prefix.endsWith('-') ? prefix.slice(0, -1) : prefix}`
    for (const [name, [min, max]] of Object.entries(theme.fontSize)) {
      shortcuts.push([`${prefix}text-${name}`, `${prefix}text-${min}/${max}`])
      if (attributify)
        shortcuts.push([`${getPrefixAttribute('text')}-${name}`, `${prefix}text-${min}/${max}`])
    }

    for (const [name, [min, max]] of Object.entries(theme.borderRadius)) {
      shortcuts.push([`${prefix}rounded-${name}`, `${prefix}rounded-${min}/${max}`])
      if (attributify)
        shortcuts.push([`${getPrefixAttribute('rounded')}-${name}`, `${prefix}rounded-${min}/${max}`])
    }

    const ignoredProperties = ['text', 'rounded']
    for (const [name, [min, max]] of Object.entries(theme.spacing)) {
      for (const utility of utilities.filter(u => !ignoredProperties.includes(u))) {
        shortcuts.push([`${prefix}${utility}-${name}`, `${prefix}${utility}-${min}/${max}`])
        if (attributify)
          shortcuts.push([`${getPrefixAttribute(utility)}-${name}`, `${prefix}${utility}-${min}/${max}`])
      }
    }
  }

  return shortcuts
}
