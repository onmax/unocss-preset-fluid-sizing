/// <reference types="vite/client" />

import type { UnoGenerator } from 'unocss'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGenerator, presetAttributify, presetUno } from 'unocss'
import { beforeEach, describe, expect, it } from 'vitest'
import { presetFluidSizing } from '../src'

const __dirname = dirname(fileURLToPath(import.meta.url))

let uno: UnoGenerator
beforeEach(async () => {
  uno = await createGenerator({ presets: [presetUno(), presetFluidSizing({ attributify: true }), presetAttributify()] })
})

describe('presetFluidSizing', async () => {
  it('should generate fluid text css', async () => {
    const { css } = await uno.generate('f-text f-text-min-12 f-text-max-16', { preflights: false })
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .f-text-min-12{--f-text-min:12;}
      .f-text-max-16{--f-text-max:16;}
      .f-text{font-size:clamp(calc(var(--f-text-unit, 1px) * var(--f-text-min, 16)), calc(var(--f-text-unit, 1px) * var(--f-text-min, 16) + (var(--f-text-max, 16) - var(--f-text-min, 16)) * (var(--f-text-container, 100vw) - (var(--f-text-unit, 1px) * var(--f-text-min-container, 320))) / (var(--f-text-max-container, 1920) - var(--f-text-min-container, 320))), calc(var(--f-text-unit, 1px) * var(--f-text-max, 16)));}"
    `)
  })
})

describe('cases', () => {
  it('case 1 - default classes', async () => {
    const input = readFileSync(resolve(__dirname, './cases/case-1/input.html'), 'utf-8')
    const { css, matched } = await uno.generate(input, { preflights: false })
    await expect([...matched].join('\n')).toMatchFileSnapshot(resolve(__dirname, './cases/case-1/matched.txt'))
    await expect(css).toMatchFileSnapshot(resolve(__dirname, './cases/case-1/output.css'))
  })

  it('case 2 - attributify mode', async () => {
    const input = readFileSync(resolve(__dirname, './cases/case-2/input.html'), 'utf-8')
    const { css, matched } = await uno.generate(input, { preflights: false })
    await expect([...matched].join('\n')).toMatchFileSnapshot(resolve(__dirname, './cases/case-2/matched.txt'))
    await expect(css).toMatchFileSnapshot(resolve(__dirname, './cases/case-2/output.css'))
  })

  it('case 3 - comprehensive test', async () => {
    const input = readFileSync(resolve(__dirname, './cases/case-3/input.html'), 'utf-8')
    const { css, matched } = await uno.generate(input, { preflights: false })
    await expect([...matched].join('\n')).toMatchFileSnapshot(resolve(__dirname, './cases/case-3/matched.txt'))
    await expect(css).toMatchFileSnapshot(resolve(__dirname, './cases/case-3/output.css'))
  })

  it('case 4 - CSS variables', async () => {
    const input = readFileSync(resolve(__dirname, './cases/case-4/input.html'), 'utf-8')
    const { css, matched } = await uno.generate(input, { preflights: false })
    await expect([...matched].join('\n')).toMatchFileSnapshot(resolve(__dirname, './cases/case-4/matched.txt'))
    await expect(css).toMatchFileSnapshot(resolve(__dirname, './cases/case-4/output.css'))
  })
})
