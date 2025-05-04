// ****************** Warning ******************
//
// The code of this library has been moved to https://github.com/onmax/unocss-preset-onmax/tree/main/packages/unocss-preset-fluid-sizing
// Please use the new package instead.
// ***********************************************

/**
 * For each pair, generate a shortcut for each utility
 */
export const theme = {

  // f-p-2xs -> f-p-min-8 f-p-max-12
  // f-gap-2xs -> f-gap-min-8 f-gap-max-12
  // @see{predefinedSpacingUtilities}
  spacing: {
    '2xs': [8, 12],
    'xs': [12, 16],
    'sm': [16, 24],
    'md': [24, 32],
    'lg': [32, 48],
    'xl': [48, 72],
    '2xl': [72, 96],
    '3xl': [96, 128],
    '4xl': [128, 144],
    '5xl': [144, 200],
  },

  borderRadius: {
    'xs': [2, 4],
    'sm': [4, 6],
    'md': [6, 8],
    'lg': [8, 12],
    'xl': [12, 16],
    '2xl': [16, 24],
  },

  // f-text-2xs -> f-text-min-9 f-text-max-11
  // f-text-lg  -> f-text-min-16 f-text-max-18
  fontSize: {
    '3xs': [9, 11],
    '2xs': [10, 12],
    'xs': [12, 14],
    'sm': [14, 16],
    'md': [16, 16],
    'lg': [16, 18],
    'xl': [18, 22],
    '2xl': [22, 26],
    '3xl': [26, 32],
    '4xl': [32, 44],
  },
}
