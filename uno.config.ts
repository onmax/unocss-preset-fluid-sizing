import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetFluidSizing } from './src/'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetFluidSizing(),
  ],
})
