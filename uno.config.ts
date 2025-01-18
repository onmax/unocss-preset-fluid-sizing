import { defineConfig, presetUno } from 'unocss'
import { presetFluidSizing } from './src/'

export default defineConfig({
  presets: [
    presetUno(),
    presetFluidSizing(),
  ],
})
