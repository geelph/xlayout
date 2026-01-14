import { themeColorCssVariables, unocssPrimaryColor } from '@rengar-admin/color'
import type { Preset } from 'unocss'

export function presetRengarAdmin(): Preset {
  const preset: Preset = {
    name: 'rengar-admin',
    theme: {
      colors: {
        primary: unocssPrimaryColor,
      },
    },
    preflights: [
      {
        getCSS() {
          return `
           :root {
              ${themeColorCssVariables}
            }
          `
        },
      },
    ],
    shortcuts: [
      {
        'flex-center': 'flex justify-center items-center',
        'flex-center-x': 'flex items-center',
        'flex-center-y': 'flex justify-center',
        'flex-y': 'flex flex-col',
      },
      {
        'absolute-center-x': 'absolute left-1/2 -translate-x-1/2',
        'absolute-center-y': 'absolute top-1/2 -translate-y-1/2',
        'absolute-center': 'absolute-center-x absolute-center-y',
      },
      {
        'no-scrollbar': '[&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]',
      },
    ],
  }
  return preset
}
